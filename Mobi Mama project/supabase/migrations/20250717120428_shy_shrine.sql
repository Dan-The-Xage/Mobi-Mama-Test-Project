/*
  # Seed sample data for MobiMama+

  1. Sample facilities
  2. Sample education content
*/

-- Insert sample facilities
INSERT INTO facilities (name, code, lga, state, address, phone) VALUES
('Gombe Central PHC', 'GBC001', 'Gombe', 'Gombe', 'Central Ward, Gombe', '+234-803-123-4567'),
('Pantami PHC', 'PAN001', 'Gombe', 'Gombe', 'Pantami Ward, Gombe', '+234-803-123-4568'),
('Tudun Wada PHC', 'TUD001', 'Gombe', 'Gombe', 'Tudun Wada, Gombe', '+234-803-123-4569'),
('Nasarawo PHC', 'NAS001', 'Gombe', 'Gombe', 'Nasarawo Ward, Gombe', '+234-803-123-4570'),
('Bolari PHC', 'BOL001', 'Gombe', 'Gombe', 'Bolari Ward, Gombe', '+234-803-123-4571')
ON CONFLICT (code) DO NOTHING;

-- Insert sample education content
INSERT INTO education_content (title, content, category, language, week_range, content_type, is_featured) VALUES
('Healthy Eating During Pregnancy', 'Eating nutritious foods is essential for both you and your baby. Focus on fruits, vegetables, whole grains, lean proteins, and dairy products. Avoid alcohol, raw fish, and limit caffeine intake.', 'nutrition', 'english', 'Week 1-40', 'article', true),
('Cin Abinci Mai Gina Jiki A Lokacin Daukar Ciki', 'Cin abincin da ke da gina jiki yana da muhimmanci ga ke da jaririn da kike dauke da shi. Ka mai da hankali kan ''ya''yan itace, kayan lambu, hatsi, nama mai kyau, da kayayyakin madara.', 'nutrition', 'hausa', 'Week 1-40', 'article', true),
('Safe Exercise During Pregnancy', 'Regular, moderate exercise during pregnancy can help you feel better and prepare your body for labor. Walking, swimming, and prenatal yoga are excellent choices. Always consult your healthcare provider before starting any exercise program.', 'exercise', 'english', 'Week 12-36', 'article', false),
('Preparing for Labor and Delivery', 'As you approach your due date, it''s important to prepare for labor and delivery. Learn about the signs of labor, create a birth plan, and pack your hospital bag. Practice breathing techniques and consider taking childbirth classes.', 'prenatal', 'english', 'Week 32-40', 'article', false),
('Recognizing Warning Signs', 'Contact your healthcare provider immediately if you experience severe headaches, vision changes, severe abdominal pain, persistent vomiting, decreased fetal movement, or vaginal bleeding.', 'safety', 'english', 'Week 1-40', 'article', false),
('Antenatal Care Visits', 'Regular ANC visits are crucial for monitoring your health and your baby''s development. These visits include physical exams, blood tests, ultrasounds, and discussions about your pregnancy progress.', 'prenatal', 'english', 'Week 1-40', 'article', false)
ON CONFLICT DO NOTHING;