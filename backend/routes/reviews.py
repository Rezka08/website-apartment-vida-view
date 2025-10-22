from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Review, Booking, Apartment, User
from datetime import datetime
from sqlalchemy import func

reviews_bp = Blueprint('reviews', __name__)

@reviews_bp.route('/', methods=['POST'])
@jwt_required()
def create_review():
    """Create new review (tenant only, must have completed booking)"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if user.role != 'tenant':
            return jsonify({'error': 'Only tenants can create reviews'}), 403
        
        data = request.get_json()
        
        # Validate required fields
        if not data.get('apartment_id') or not data.get('rating'):
            return jsonify({'error': 'apartment_id and rating are required'}), 400
        
        # Validate rating (1-5)
        if data['rating'] < 1 or data['rating'] > 5:
            return jsonify({'error': 'Rating must be between 1 and 5'}), 400
        
        # Check if user has completed booking for this apartment
        booking = Booking.query.filter_by(
            apartment_id=data['apartment_id'],
            tenant_id=current_user_id,
            status='completed'
        ).first()
        
        if not booking:
            return jsonify({'error': 'You can only review apartments you have rented'}), 403
        
        # Check if user already reviewed this booking
        existing_review = Review.query.filter_by(
            booking_id=booking.id
        ).first()
        
        if existing_review:
            return jsonify({'error': 'You have already reviewed this booking'}), 400
        
        # Create review
        new_review = Review(
            apartment_id=data['apartment_id'],
            tenant_id=current_user_id,
            booking_id=booking.id,
            rating=data['rating'],
            review_text=data.get('review_text'),
            photos=data.get('photos'),
            is_approved=False  # Needs admin approval
        )
        
        db.session.add(new_review)
        db.session.commit()
        
        return jsonify({
            'message': 'Review submitted successfully. Waiting for approval.',
            'review': new_review.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@reviews_bp.route('/apartment/<int:apartment_id>', methods=['GET'])
def get_apartment_reviews(apartment_id):
    """Get reviews for specific apartment (approved only for public)"""
    try:
        # Get approved reviews
        reviews = Review.query.filter_by(
            apartment_id=apartment_id,
            is_approved=True
        ).all()
        
        return jsonify([review.to_dict() for review in reviews]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@reviews_bp.route('/my-reviews', methods=['GET'])
@jwt_required()
def get_my_reviews():
    """Get current user's reviews"""
    try:
        current_user_id = get_jwt_identity()
        reviews = Review.query.filter_by(tenant_id=current_user_id).all()
        
        return jsonify([review.to_dict() for review in reviews]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@reviews_bp.route('/<int:id>/approve', methods=['POST'])
@jwt_required()
def approve_review(id):
    """Approve review (admin/owner only)"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if user.role not in ['admin', 'owner']:
            return jsonify({'error': 'Unauthorized'}), 403
        
        review = Review.query.get(id)
        
        if not review:
            return jsonify({'error': 'Review not found'}), 404
        
        # If owner, check if they own the apartment
        if user.role == 'owner':
            apartment = Apartment.query.get(review.apartment_id)
            if apartment.owner_id != current_user_id:
                return jsonify({'error': 'Unauthorized'}), 403
        
        review.is_approved = True
        review.approved_by = current_user_id
        review.approved_at = datetime.utcnow()
        
        # Update apartment average rating
        apartment = Apartment.query.get(review.apartment_id)
        avg_rating = db.session.query(func.avg(Review.rating)).filter(
            Review.apartment_id == review.apartment_id,
            Review.is_approved == True
        ).scalar()
        
        apartment.avg_rating = round(float(avg_rating), 2) if avg_rating else 0
        
        db.session.commit()
        
        return jsonify({
            'message': 'Review approved successfully',
            'review': review.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@reviews_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_review(id):
    """Delete review (own review or admin)"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        review = Review.query.get(id)
        
        if not review:
            return jsonify({'error': 'Review not found'}), 404
        
        # Check authorization
        if user.role != 'admin' and review.tenant_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        apartment_id = review.apartment_id
        
        db.session.delete(review)
        db.session.commit()
        
        # Update apartment average rating
        apartment = Apartment.query.get(apartment_id)
        avg_rating = db.session.query(func.avg(Review.rating)).filter(
            Review.apartment_id == apartment_id,
            Review.is_approved == True
        ).scalar()
        
        apartment.avg_rating = round(float(avg_rating), 2) if avg_rating else 0
        db.session.commit()
        
        return jsonify({'message': 'Review deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@reviews_bp.route('/pending', methods=['GET'])
@jwt_required()
def get_pending_reviews():
    """Get pending reviews (admin/owner only)"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if user.role not in ['admin', 'owner']:
            return jsonify({'error': 'Unauthorized'}), 403
        
        if user.role == 'admin':
            reviews = Review.query.filter_by(is_approved=False).all()
        else:
            # Get reviews for owner's apartments
            apartment_ids = [apt.id for apt in Apartment.query.filter_by(owner_id=current_user_id).all()]
            reviews = Review.query.filter(
                Review.apartment_id.in_(apartment_ids),
                Review.is_approved == False
            ).all()
        
        return jsonify([review.to_dict() for review in reviews]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500