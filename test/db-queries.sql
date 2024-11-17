-- Test Queries for Database Verification

-- Check Users Table
SELECT * FROM users LIMIT 5;

-- Check Profiles Table
SELECT 
  p.*,
  u.email,
  u.role
FROM profiles p
JOIN users u ON u.id = p.id
LIMIT 5;

-- Check Bookings
SELECT 
  b.*,
  u.email as customer_email,
  c.email as cleaner_email
FROM bookings b
JOIN users u ON u.id = b.customer_id
LEFT JOIN users c ON c.id = b.cleaner_id
LIMIT 5;

-- Check Enum Values
SELECT enum_range(NULL::user_role);
SELECT enum_range(NULL::booking_status);