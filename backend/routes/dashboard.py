from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User, Apartment, Booking, Payment, Review
from sqlalchemy import func, extract
from datetime import datetime, timedelta

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/admin/stats', methods=['GET'])
@jwt_required()
def get_admin_stats():
    """Get admin dashboard statistics"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if user.role != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403
        
        # Total counts
        total_users = User.query.count()
        total_tenants = User.query.filter_by(role='tenant').count()
        total_owners = User.query.filter_by(role='owner').count()
        total_apartments = Apartment.query.count()
        available_apartments = Apartment.query.filter_by(availability_status='available').count()
        occupied_apartments = Apartment.query.filter_by(availability_status='occupied').count()
        
        # Booking statistics
        total_bookings = Booking.query.count()
        pending_bookings = Booking.query.filter_by(status='pending').count()
        active_bookings = Booking.query.filter_by(status='active').count()
        
        # Revenue statistics
        total_revenue = db.session.query(func.sum(Payment.amount)).filter(
            Payment.payment_status == 'completed'
        ).scalar() or 0
        
        # This month revenue
        current_month = datetime.now().month
        current_year = datetime.now().year
        monthly_revenue = db.session.query(func.sum(Payment.amount)).filter(
            Payment.payment_status == 'completed',
            extract('month', Payment.payment_date) == current_month,
            extract('year', Payment.payment_date) == current_year
        ).scalar() or 0
        
        # Pending reviews
        pending_reviews = Review.query.filter_by(is_approved=False).count()
        
        return jsonify({
            'users': {
                'total': total_users,
                'tenants': total_tenants,
                'owners': total_owners
            },
            'apartments': {
                'total': total_apartments,
                'available': available_apartments,
                'occupied': occupied_apartments,
                'occupancy_rate': round((occupied_apartments / total_apartments * 100), 2) if total_apartments > 0 else 0
            },
            'bookings': {
                'total': total_bookings,
                'pending': pending_bookings,
                'active': active_bookings
            },
            'revenue': {
                'total': float(total_revenue),
                'monthly': float(monthly_revenue)
            },
            'pending_reviews': pending_reviews
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@dashboard_bp.route('/owner/stats', methods=['GET'])
@jwt_required()
def get_owner_stats():
    """Get owner dashboard statistics"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if user.role != 'owner':
            return jsonify({'error': 'Unauthorized'}), 403
        
        # Owner's apartments
        apartments = Apartment.query.filter_by(owner_id=current_user_id).all()
        apartment_ids = [apt.id for apt in apartments]
        
        total_units = len(apartments)
        available_units = sum(1 for apt in apartments if apt.availability_status == 'available')
        occupied_units = sum(1 for apt in apartments if apt.availability_status == 'occupied')
        
        # Bookings for owner's apartments
        total_bookings = Booking.query.filter(Booking.apartment_id.in_(apartment_ids)).count()
        pending_bookings = Booking.query.filter(
            Booking.apartment_id.in_(apartment_ids),
            Booking.status == 'pending'
        ).count()
        
        # Revenue from owner's apartments
        booking_ids = [b.id for b in Booking.query.filter(Booking.apartment_id.in_(apartment_ids)).all()]
        total_revenue = db.session.query(func.sum(Payment.amount)).filter(
            Payment.booking_id.in_(booking_ids),
            Payment.payment_status == 'completed'
        ).scalar() or 0
        
        # This month revenue
        current_month = datetime.now().month
        current_year = datetime.now().year
        monthly_revenue = db.session.query(func.sum(Payment.amount)).filter(
            Payment.booking_id.in_(booking_ids),
            Payment.payment_status == 'completed',
            extract('month', Payment.payment_date) == current_month,
            extract('year', Payment.payment_date) == current_year
        ).scalar() or 0
        
        # Average rating
        total_reviews = Review.query.filter(
            Review.apartment_id.in_(apartment_ids),
            Review.is_approved == True
        ).count()
        avg_rating = db.session.query(func.avg(Review.rating)).filter(
            Review.apartment_id.in_(apartment_ids),
            Review.is_approved == True
        ).scalar() or 0
        
        return jsonify({
            'units': {
                'total': total_units,
                'available': available_units,
                'occupied': occupied_units,
                'occupancy_rate': round((occupied_units / total_units * 100), 2) if total_units > 0 else 0
            },
            'bookings': {
                'total': total_bookings,
                'pending': pending_bookings
            },
            'revenue': {
                'total': float(total_revenue),
                'monthly': float(monthly_revenue)
            },
            'reviews': {
                'total': total_reviews,
                'average_rating': round(float(avg_rating), 2) if avg_rating else 0
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@dashboard_bp.route('/tenant/stats', methods=['GET'])
@jwt_required()
def get_tenant_stats():
    """Get tenant dashboard statistics"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if user.role != 'tenant':
            return jsonify({'error': 'Unauthorized'}), 403
        
        # Tenant's bookings
        total_bookings = Booking.query.filter_by(tenant_id=current_user_id).count()
        active_bookings = Booking.query.filter_by(
            tenant_id=current_user_id,
            status='active'
        ).count()
        pending_bookings = Booking.query.filter_by(
            tenant_id=current_user_id,
            status='pending'
        ).count()
        completed_bookings = Booking.query.filter_by(
            tenant_id=current_user_id,
            status='completed'
        ).count()
        
        # Payments
        booking_ids = [b.id for b in Booking.query.filter_by(tenant_id=current_user_id).all()]
        total_spent = db.session.query(func.sum(Payment.amount)).filter(
            Payment.booking_id.in_(booking_ids),
            Payment.payment_status == 'completed'
        ).scalar() or 0
        
        pending_payments = Payment.query.filter(
            Payment.booking_id.in_(booking_ids),
            Payment.payment_status == 'pending'
        ).count()
        
        # Favorites
        from models import Favorite
        total_favorites = Favorite.query.filter_by(user_id=current_user_id).count()
        
        # Reviews
        total_reviews = Review.query.filter_by(tenant_id=current_user_id).count()
        
        return jsonify({
            'bookings': {
                'total': total_bookings,
                'active': active_bookings,
                'pending': pending_bookings,
                'completed': completed_bookings
            },
            'payments': {
                'total_spent': float(total_spent),
                'pending': pending_payments
            },
            'favorites': total_favorites,
            'reviews': total_reviews
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@dashboard_bp.route('/revenue-chart', methods=['GET'])
@jwt_required()
def get_revenue_chart():
    """Get revenue chart data (last 6 months)"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if user.role not in ['admin', 'owner']:
            return jsonify({'error': 'Unauthorized'}), 403
        
        # Get last 6 months data
        months_data = []
        current_date = datetime.now()
        
        for i in range(5, -1, -1):
            month_date = current_date - timedelta(days=30 * i)
            month = month_date.month
            year = month_date.year
            
            if user.role == 'admin':
                revenue = db.session.query(func.sum(Payment.amount)).filter(
                    Payment.payment_status == 'completed',
                    extract('month', Payment.payment_date) == month,
                    extract('year', Payment.payment_date) == year
                ).scalar() or 0
            else:
                apartment_ids = [apt.id for apt in Apartment.query.filter_by(owner_id=current_user_id).all()]
                booking_ids = [b.id for b in Booking.query.filter(Booking.apartment_id.in_(apartment_ids)).all()]
                revenue = db.session.query(func.sum(Payment.amount)).filter(
                    Payment.booking_id.in_(booking_ids),
                    Payment.payment_status == 'completed',
                    extract('month', Payment.payment_date) == month,
                    extract('year', Payment.payment_date) == year
                ).scalar() or 0
            
            months_data.append({
                'month': month_date.strftime('%B %Y'),
                'revenue': float(revenue)
            })
        
        return jsonify(months_data), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500