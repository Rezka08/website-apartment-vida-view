"""
Database initialization script
Run this to create all tables from models
"""
from app import create_app, db

def init_db():
    """Initialize database and create all tables"""
    app = create_app()
    
    with app.app_context():
        # Create all tables
        db.create_all()
        print("✓ Database tables created successfully!")
        
        # Optional: Create admin user if not exists
        from models import User
        from flask_bcrypt import Bcrypt
        
        bcrypt = Bcrypt()
        
        admin = User.query.filter_by(email='admin@vidaview.com').first()
        if not admin:
            admin = User(
                username='admin',
                email='admin@vidaview.com',
                password=bcrypt.generate_password_hash('password123').decode('utf-8'),
                full_name='Admin Vida View',
                phone='081234567890',
                role='admin',
                status='active'
            )
            db.session.add(admin)
            db.session.commit()
            print("✓ Admin user created successfully!")
            print("  Email: admin@vidaview.com")
            print("  Password: password123")
        else:
            print("✓ Admin user already exists")

if __name__ == '__main__':
    init_db()