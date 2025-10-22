from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Booking, Apartment, User, Notification
from datetime import datetime
import random
import string

bookings_bp = Blueprint('bookings', __name__)

def generate_booking_code():
    """Generate unique booking code"""
    timestamp = datetime.now().strftime('%Y%m%d')
    random_str = ''.join(random.choices(string.digits, k=3))
    return f'BK{timestamp}{random_str}'

@bookings_bp.route('/', methods=['POST'])
@jwt_required()
def create_booking():
    """Create new booking"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if user.role != 'tenant':
            return jsonify({'error': 'Only tenants can create bookings'}), 403
        
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['apartment_id', 'start_date', 'end_date', 'total_months']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Check if apartment exists and available
        apartment = Apartment.query.get(data['apartment_id'])
        if not apartment:
            return jsonify({'error': 'Apartment not found'}), 404
        
        if apartment.availability_status != 'available':
            return jsonify({'error': 'Apartment is not available'}), 400
        
        # Generate booking code
        booking_code = generate_booking_code()
        while Booking.query.filter_by(booking_code=booking_code).first():
            booking_code = generate_booking_code()
        
        # Calculate amounts
        monthly_rent = float(apartment.price_per_month)
        total_months = data['total_months']
        deposit_paid = float(apartment.deposit_amount) if apartment.deposit_amount else 0
        utility_deposit = data.get('utility_deposit', 0)
        admin_fee = data.get('admin_fee', 0)
        total_amount = (monthly_rent * total_months) + deposit_paid + utility_deposit + admin_fee
        
        # Create booking
        new_booking = Booking(
            apartment_id=data['apartment_id'],
            tenant_id=current_user_id,
            booking_code=booking_code,
            start_date=datetime.strptime(data['start_date'], '%Y-%m-%d').date(),
            end_date=datetime.strptime(data['end_date'], '%Y-%m-%d').date(),
            total_months=total_months,
            monthly_rent=monthly_rent,
            deposit_paid=deposit_paid,
            utility_deposit=utility_deposit,
            admin_fee=admin_fee,
            total_amount=total_amount,
            status='pending',
            notes=data.get('notes')
        )
        
        db.session.add(new_booking)
        
        # Create notification for owner
        notification = Notification(
            user_id=apartment.owner_id,
            title='Booking Baru',
            message=f'Ada booking baru untuk unit {apartment.unit_number} dari {user.full_name}',
            type='booking',
            related_id=new_booking.id
        )
        db.session.add(notification)
        
        db.session.commit()
        
        return jsonify({
            'message': 'Booking created successfully',
            'booking': new_booking.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@bookings_bp.route('/my-bookings', methods=['GET'])
@jwt_required()
def get_my_bookings():
    """Get current user's bookings"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if user.role == 'tenant':
            bookings = Booking.query.filter_by(tenant_id=current_user_id).all()
        elif user.role == 'owner':
            # Get bookings for apartments owned by current user
            apartment_ids = [apt.id for apt in Apartment.query.filter_by(owner_id=current_user_id).all()]
            bookings = Booking.query.filter(Booking.apartment_id.in_(apartment_ids)).all()
        else:
            bookings = Booking.query.all()
        
        return jsonify([booking.to_dict() for booking in bookings]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bookings_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_booking(id):
    """Get booking detail"""
    try:
        current_user_id = get_jwt_identity()
        booking = Booking.query.get(id)
        
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404
        
        # Check authorization
        user = User.query.get(current_user_id)
        apartment = Apartment.query.get(booking.apartment_id)
        
        if user.role != 'admin' and booking.tenant_id != current_user_id and apartment.owner_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        return jsonify(booking.to_dict()), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bookings_bp.route('/<int:id>/approve', methods=['POST'])
@jwt_required()
def approve_booking(id):
    """Approve booking (owner/admin only)"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        booking = Booking.query.get(id)
        
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404
        
        apartment = Apartment.query.get(booking.apartment_id)
        
        # Check authorization
        if user.role not in ['admin', 'owner'] or (user.role == 'owner' and apartment.owner_id != current_user_id):
            return jsonify({'error': 'Unauthorized'}), 403
        
        # Update booking status
        booking.status = 'confirmed'
        booking.approved_by = current_user_id
        booking.approved_at = datetime.utcnow()
        
        # Update apartment status
        apartment.availability_status = 'occupied'
        
        # Create notification for tenant
        notification = Notification(
            user_id=booking.tenant_id,
            title='Booking Disetujui',
            message=f'Booking Anda untuk unit {apartment.unit_number} telah disetujui',
            type='booking',
            related_id=booking.id
        )
        db.session.add(notification)
        
        db.session.commit()
        
        return jsonify({
            'message': 'Booking approved successfully',
            'booking': booking.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@bookings_bp.route('/<int:id>/reject', methods=['POST'])
@jwt_required()
def reject_booking(id):
    """Reject booking (owner/admin only)"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        booking = Booking.query.get(id)
        
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404
        
        apartment = Apartment.query.get(booking.apartment_id)
        
        # Check authorization
        if user.role not in ['admin', 'owner'] or (user.role == 'owner' and apartment.owner_id != current_user_id):
            return jsonify({'error': 'Unauthorized'}), 403
        
        data = request.get_json()
        
        # Update booking status
        booking.status = 'rejected'
        booking.rejection_reason = data.get('reason', 'No reason provided')
        booking.approved_by = current_user_id
        booking.approved_at = datetime.utcnow()
        
        # Create notification for tenant
        notification = Notification(
            user_id=booking.tenant_id,
            title='Booking Ditolak',
            message=f'Booking Anda untuk unit {apartment.unit_number} ditolak. Alasan: {booking.rejection_reason}',
            type='booking',
            related_id=booking.id
        )
        db.session.add(notification)
        
        db.session.commit()
        
        return jsonify({
            'message': 'Booking rejected',
            'booking': booking.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@bookings_bp.route('/<int:id>/cancel', methods=['POST'])
@jwt_required()
def cancel_booking(id):
    """Cancel booking (tenant only)"""
    try:
        current_user_id = get_jwt_identity()
        booking = Booking.query.get(id)
        
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404
        
        # Check authorization
        if booking.tenant_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        # Can only cancel pending or confirmed bookings
        if booking.status not in ['pending', 'confirmed']:
            return jsonify({'error': 'Cannot cancel this booking'}), 400
        
        # Update booking status
        booking.status = 'cancelled'
        
        # Update apartment status if was confirmed
        if booking.status == 'confirmed':
            apartment = Apartment.query.get(booking.apartment_id)
            apartment.availability_status = 'available'
        
        db.session.commit()
        
        return jsonify({
            'message': 'Booking cancelled successfully',
            'booking': booking.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500