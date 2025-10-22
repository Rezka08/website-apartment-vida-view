from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Facility, User

facilities_bp = Blueprint('facilities', __name__)

@facilities_bp.route('/', methods=['GET'])
def get_facilities():
    """Get all facilities"""
    try:
        category = request.args.get('category')
        status = request.args.get('status', 'active')
        
        query = Facility.query
        
        if category:
            query = query.filter_by(category=category)
        if status:
            query = query.filter_by(status=status)
        
        facilities = query.all()
        
        return jsonify([facility.to_dict() for facility in facilities]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@facilities_bp.route('/<int:id>', methods=['GET'])
def get_facility(id):
    """Get facility by ID"""
    try:
        facility = Facility.query.get(id)
        
        if not facility:
            return jsonify({'error': 'Facility not found'}), 404
        
        return jsonify(facility.to_dict()), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@facilities_bp.route('/', methods=['POST'])
@jwt_required()
def create_facility():
    """Create new facility (admin only)"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if user.role != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403
        
        data = request.get_json()
        
        if not data.get('name'):
            return jsonify({'error': 'name is required'}), 400
        
        new_facility = Facility(
            name=data['name'],
            description=data.get('description'),
            icon=data.get('icon'),
            category=data.get('category', 'building'),
            status=data.get('status', 'active')
        )
        
        db.session.add(new_facility)
        db.session.commit()
        
        return jsonify({
            'message': 'Facility created successfully',
            'facility': new_facility.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@facilities_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_facility(id):
    """Update facility (admin only)"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if user.role != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403
        
        facility = Facility.query.get(id)
        
        if not facility:
            return jsonify({'error': 'Facility not found'}), 404
        
        data = request.get_json()
        
        if 'name' in data:
            facility.name = data['name']
        if 'description' in data:
            facility.description = data['description']
        if 'icon' in data:
            facility.icon = data['icon']
        if 'category' in data:
            facility.category = data['category']
        if 'status' in data:
            facility.status = data['status']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Facility updated successfully',
            'facility': facility.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@facilities_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_facility(id):
    """Delete facility (admin only)"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if user.role != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403
        
        facility = Facility.query.get(id)
        
        if not facility:
            return jsonify({'error': 'Facility not found'}), 404
        
        db.session.delete(facility)
        db.session.commit()
        
        return jsonify({'message': 'Facility deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500