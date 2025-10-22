from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Payment, Booking, User
from datetime import datetime
import random
import string

payments_bp = Blueprint('payments', __name__)

def generate_payment_code():
    """Generate unique payment code"""
    timestamp = datetime.now().strftime('%Y%m%d')
    random_str = ''.join(random.choices(string.digits, k=3))
    return f'PAY{timestamp}{random_str}'

@payments_bp.route('/', methods=['POST'])
@jwt_required()
def create_payment():
    """Create new payment"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        if not data.get('booking_id'):
            return jsonify({'error': 'booking_id is required'}), 400
        
        # Check if booking exists
        booking = Booking.query.get(data['booking_id'])
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404
        
        # Check authorization
        if booking.tenant_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        # Generate payment code
        payment_code = generate_payment_code()
        while Payment.query.filter_by(payment_code=payment_code).first():
            payment_code = generate_payment_code()
        
        # Create payment
        new_payment = Payment(
            booking_id=data['booking_id'],
            payment_code=payment_code,
            payment_type=data.get('payment_type', 'monthly_rent'),
            amount=data['amount'],
            payment_method=data.get('payment_method'),
            payment_status='pending',
            due_date=data.get('due_date'),
            notes=data.get('notes')
        )
        
        db.session.add(new_payment)
        db.session.commit()
        
        return jsonify({
            'message': 'Payment created successfully',
            'payment': new_payment.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@payments_bp.route('/booking/<int:booking_id>', methods=['GET'])
@jwt_required()
def get_booking_payments(booking_id):
    """Get payments for specific booking"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        booking = Booking.query.get(booking_id)
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404
        
        # Check authorization
        from models import Apartment
        apartment = Apartment.query.get(booking.apartment_id)
        
        if user.role != 'admin' and booking.tenant_id != current_user_id and apartment.owner_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        payments = Payment.query.filter_by(booking_id=booking_id).all()
        
        return jsonify([payment.to_dict() for payment in payments]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@payments_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_payment(id):
    """Get payment detail"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        payment = Payment.query.get(id)
        if not payment:
            return jsonify({'error': 'Payment not found'}), 404
        
        booking = Booking.query.get(payment.booking_id)
        
        # Check authorization
        from models import Apartment
        apartment = Apartment.query.get(booking.apartment_id)
        
        if user.role != 'admin' and booking.tenant_id != current_user_id and apartment.owner_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        return jsonify(payment.to_dict()), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@payments_bp.route('/<int:id>/confirm', methods=['POST'])
@jwt_required()
def confirm_payment(id):
    """Confirm payment (admin/owner only)"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if user.role not in ['admin', 'owner']:
            return jsonify({'error': 'Unauthorized'}), 403
        
        payment = Payment.query.get(id)
        if not payment:
            return jsonify({'error': 'Payment not found'}), 404
        
        data = request.get_json()
        
        payment.payment_status = 'completed'
        payment.payment_date = datetime.utcnow()
        payment.transaction_id = data.get('transaction_id')
        
        db.session.commit()
        
        return jsonify({
            'message': 'Payment confirmed successfully',
            'payment': payment.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500