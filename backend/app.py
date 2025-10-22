from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from config import config
from models import db
import os

bcrypt = Bcrypt()
jwt = JWTManager()

def create_app(config_name='development'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": app.config['CORS_ORIGINS']}})
    
    # Create upload folder if not exists
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    
    # Register blueprints
    from routes.auth import auth_bp
    from routes.apartments import apartments_bp
    from routes.bookings import bookings_bp
    from routes.users import users_bp
    from routes.reviews import reviews_bp
    from routes.favorites import favorites_bp
    from routes.notifications import notifications_bp
    from routes.facilities import facilities_bp
    from routes.payments import payments_bp
    from routes.dashboard import dashboard_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(apartments_bp, url_prefix='/api/apartments')
    app.register_blueprint(bookings_bp, url_prefix='/api/bookings')
    app.register_blueprint(users_bp, url_prefix='/api/users')
    app.register_blueprint(reviews_bp, url_prefix='/api/reviews')
    app.register_blueprint(favorites_bp, url_prefix='/api/favorites')
    app.register_blueprint(notifications_bp, url_prefix='/api/notifications')
    app.register_blueprint(facilities_bp, url_prefix='/api/facilities')
    app.register_blueprint(payments_bp, url_prefix='/api/payments')
    app.register_blueprint(dashboard_bp, url_prefix='/api/dashboard')
    
    # Root endpoint
    @app.route('/')
    def index():
        return {
            'message': 'Welcome to Vida View API',
            'version': '1.0.0',
            'status': 'running'
        }
    
    # Health check
    @app.route('/health')
    def health():
        return {'status': 'healthy'}
    
    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.getenv('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)