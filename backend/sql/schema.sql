-- Dummy table --
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);

DROP TABLE IF EXISTS Listing;
DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS Member;

CREATE TABLE Member(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), member JSONB);

CREATE TABLE Category(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), parentCategory UUID, category JSONB, FOREIGN KEY (parentCategory) REFERENCES Category(id));

CREATE TABLE Listing(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), category UUID, member UUID, listing JSONB, FOREIGN KEY (category) REFERENCES Category(id), FOREIGN KEY (member) REFERENCES Member(id));
