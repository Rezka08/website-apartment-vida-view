from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Favorite, Apartment

favorites_bp = Blueprint('favorites', __name__)

@favorites_bp.route('/', methods=['GET'])
@jwt_required()
def get_favorites():
    """Get current user's favorite apartments"""
    try:
        current_user_id = get_jwt_identity()
        favorites = Favorite.query.filter_by(user_id=current_user_id).all()
        
        return jsonify([fav.to_dict() for fav in favorites]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@favorites_bp.route('/', methods=['POST'])
@jwt_required()
def add_favorite():
    """Add apartment to favorites"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        if not data.get('apartment_id'):
            return jsonify({'error': 'apartment_id is required'}), 400
        
        # Check if apartment exists
        apartment = Apartment.query.get(data['apartment_id'])
        if not apartment:
            return jsonify({'error': 'Apartment not found'}), 404
        
        # Check if already in favorites
        existing = Favorite.query.filter_by(
            user_id=current_user_id,
            apartment_id=data['apartment_id']
        ).first()
        
        if existing:
            return jsonify({'error': 'Apartment already in favorites'}), 400
        
        # Add to favorites
        new_favorite = Favorite(
            user_id=current_user_id,
            apartment_id=data['apartment_id']
        )
        
        db.session.add(new_favorite)
        db.session.commit()
        
        return jsonify({
            'message': 'Added to favorites',
            'favorite': new_favorite.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@favorites_bp.route('/<int:apartment_id>', methods=['DELETE'])
@jwt_required()
def remove_favorite(apartment_id):
    """Remove apartment from favorites"""
    try:
        current_user_id = get_jwt_identity()
        
        favorite = Favorite.query.filter_by(
            user_id=current_user_id,
            apartment_id=apartment_id
        ).first()
        
        if not favorite:
            return jsonify({'error': 'Favorite not found'}), 404
        
        db.session.delete(favorite)
        db.session.commit()
        
        return jsonify({'message': 'Removed from favorites'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@favorites_bp.route('/check/<int:apartment_id>', methods=['GET'])
@jwt_required()
def check_favorite(apartment_id):
    """Check if apartment is in user's favorites"""
    try:
        current_user_id = get_jwt_identity()
        
        favorite = Favorite.query.filter_by(
            user_id=current_user_id,
            apartment_id=apartment_id
        ).first()
        
        return jsonify({'is_favorite': favorite is not None}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500