from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Apartment, User, UnitPhoto, ApartmentFacility, Review
from sqlalchemy import or_, and_

apartments_bp = Blueprint('apartments', __name__)

@apartments_bp.route('/', methods=['GET'])
def get_apartments():
    """Get all apartments with filters"""
    try:
        # Get query parameters
        unit_type = request.args.get('unit_type')
        min_price = request.args.get('min_price', type=float)
        max_price = request.args.get('max_price', type=float)
        bedrooms = request.args.get('bedrooms', type=int)
        availability = request.args.get('availability', 'available')
        furnished = request.args.get('furnished', type=bool)
        search = request.args.get('search')
        
        # Build query
        query = Apartment.query
        
        # Apply filters
        if unit_type:
            query = query.filter(Apartment.unit_type == unit_type)
        
        if min_price:
            query = query.filter(Apartment.price_per_month >= min_price)
        
        if max_price:
            query = query.filter(Apartment.price_per_month <= max_price)
        
        if bedrooms:
            query = query.filter(Apartment.bedrooms == bedrooms)
        
        if availability:
            query = query.filter(Apartment.availability_status == availability)
        
        if furnished is not None:
            query = query.filter(Apartment.furnished == furnished)
        
        if search:
            search_pattern = f'%{search}%'
            query = query.filter(or_(
                Apartment.unit_number.like(search_pattern),
                Apartment.description.like(search_pattern),
                Apartment.unit_type.like(search_pattern)
            ))
        
        apartments = query.all()
        
        return jsonify([apt.to_dict() for apt in apartments]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@apartments_bp.route('/<int:id>', methods=['GET'])
def get_apartment(id):
    """Get single apartment by ID"""

    try:
        apartment = Apartment.query.get(id)
        
        if not apartment:
            return jsonify({'error': 'Apartment not found'}), 404
        
        # Increment views
        apartment.total_views += 1
        db.session.commit()
        
        # Get reviews
        reviews = Review.query.filter_by(
            apartment_id=id,
            is_approved=True
        ).all()
        
        apartment_data = apartment.to_dict(include_owner=True)
        apartment_data['reviews'] = [review.to_dict() for review in reviews]
        
        return jsonify(apartment_data), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@apartments_bp.route('/', methods=['POST'])
@jwt_required()
def create_apartment():
    """Create new apartment (owner only)"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or user.role not in ['owner', 'admin']:
            return jsonify({'error': 'Unauthorized'}), 403
        
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['unit_number', 'unit_type', 'price_per_month']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Create new apartment
        new_apartment = Apartment(
            unit_number=data['unit_number'],
            unit_type=data['unit_type'],
            floor=data.get('floor'),
            size_sqm=data.get('size_sqm'),
            bedrooms=data.get('bedrooms'),
            bathrooms=data.get('bathrooms'),
            price_per_month=data['price_per_month'],
            deposit_amount=data.get('deposit_amount'),
            minimum_stay_months=data.get('minimum_stay_months', 1),
            description=data.get('description'),
            furnished=data.get('furnished', False),
            view_direction=data.get('view_direction'),
            electricity_watt=data.get('electricity_watt'),
            water_source=data.get('water_source'),


            parking_slots=data.get('parking_slots'),
            pet_friendly=data.get('pet_friendly', False),
            smoking_allowed=data.get('smoking_allowed', False),
            availability_status=data.get('availability_status', 'available'),
            owner_id=current_user_id
        )
        
        db.session.add(new_apartment)
        db.session.flush()  # Get apartment ID
        
        # Add photos if provided
        if 'photos' in data and data['photos']:
            for photo_data in data['photos']:
                photo = UnitPhoto(
                    apartment_id=new_apartment.id,
                    photo_url=photo_data.get('url'),
                    photo_type=photo_data.get('type', 'other'),
                    caption=photo_data.get('caption'),
                    is_cover=photo_data.get('is_cover', False)
                )
                db.session.add(photo)
        
        # Add facilities if provided
        if 'facility_ids' in data and data['facility_ids']:
            for facility_id in data['facility_ids']:
                apt_facility = ApartmentFacility(
                    apartment_id=new_apartment.id,
                    facility_id=facility_id
                )
                db.session.add(apt_facility)
        
        db.session.commit()
        
        return jsonify({
            'message': 'Apartment created successfully',
            'apartment': new_apartment.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@apartments_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_apartment(id):
    """Update apartment (owner only)"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        apartment = Apartment.query.get(id)
        
        if not apartment:
            return jsonify({'error': 'Apartment not found'}), 404
        
        # Check authorization
        if user.role != 'admin' and apartment.owner_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        data = request.get_json()
        
        # Update fields
        if 'unit_number' in data:
            apartment.unit_number = data['unit_number']
        if 'unit_type' in data:
            apartment.unit_type = data['unit_type']
        if 'floor' in data:
            apartment.floor = data['floor']
        if 'size_sqm' in data:
            apartment.size_sqm = data['size_sqm']
        if 'bedrooms' in data:
            apartment.bedrooms = data['bedrooms']
        if 'bathrooms' in data:
            apartment.bathrooms = data['bathrooms']
        if 'price_per_month' in data:
            apartment.price_per_month = data['price_per_month']
        if 'deposit_amount' in data:
            apartment.deposit_amount = data['deposit_amount']
        if 'description' in data:
            apartment.description = data['description']
        if 'furnished' in data:
            apartment.furnished = data['furnished']
        if 'view_direction' in data:
            apartment.view_direction = data['view_direction']
        if 'availability_status' in data:
            apartment.availability_status = data['availability_status']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Apartment updated successfully',
            'apartment': apartment.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@apartments_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_apartment(id):
    """Delete apartment (owner/admin only)"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        apartment = Apartment.query.get(id)
        
        if not apartment:
            return jsonify({'error': 'Apartment not found'}), 404
        
        # Check authorization
        if user.role != 'admin' and apartment.owner_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        db.session.delete(apartment)
        db.session.commit()
        
        return jsonify({'message': 'Apartment deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@apartments_bp.route('/my-units', methods=['GET'])
@jwt_required()
def get_my_apartments():
    """Get apartments owned by current user"""
    try:
        current_user_id = get_jwt_identity()
        apartments = Apartment.query.filter_by(owner_id=current_user_id).all()
        
        return jsonify([apt.to_dict() for apt in apartments]), 200
        
    except Exception as e:

        return jsonify({'error': str(e)}), 500