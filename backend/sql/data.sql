-- Dummy Data --
INSERT INTO dummy (created) VALUES (current_timestamp);

DELETE FROM Member;
-- Populate Your Tables Here --
INSERT INTO Member (id, member) VALUES ('e3c75a5b-f6a5-4c3f-8b1d-42c110eb4f85','{"member":{"name":"Tyrus Sjostrom","email":"breadwood0@huffingtonpost.com","hash":"$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y"}}');
INSERT INTO Member (id, member) VALUES ('9bf2a29d-8929-4e84-9e61-a189a4b3b7e9','{"member":{"name":"Astrid Bristoe","email":"edeport1@scribd.com","hash":"$2b$10$Y00XOZD/f5gBSpDusPUgU.G1ohpR3oQbbBHK4KzX7dU219Pv/lzze"}}');

-- Vehicles -> Trucks / Cars -> Minivans -> 4 Wheel Drive / Motorcycles --
DELETE FROM Category;
INSERT INTO Category (id, category) VALUES ('c116da78-5ff5-413c-8107-c452a018dd77','{"category":{"name":"Vehicles"}}');

INSERT INTO Category (id, parentCategory, category) VALUES ('cfc0d91f-9cfe-4ee3-8f02-edc7877ee8db','c116da78-5ff5-413c-8107-c452a018dd77','{"category":{"name":"Trucks"}}');

INSERT INTO Category (id, parentCategory, category) VALUES ('59d3e077-bcfc-4241-a487-2ace1502998a','c116da78-5ff5-413c-8107-c452a018dd77','{"category":{"name":"Motorcycles"}}');

INSERT INTO Category (id, parentCategory, category) VALUES ('465836c4-5f97-45a6-ba90-fe0966a18428','c116da78-5ff5-413c-8107-c452a018dd77','{"category":{"name":"Cars"}}');

INSERT INTO Category (id, parentCategory, category) VALUES ('8f60ef24-fdac-40c4-b46b-4bdf9e97d9e0','465836c4-5f97-45a6-ba90-fe0966a18428','{"category":{"name":"Minivans"}}');

INSERT INTO Category (id, parentCategory, category) VALUES ('a30c1c1d-7947-40a0-84ef-2f0af549034c','8f60ef24-fdac-40c4-b46b-4bdf9e97d9e0','{"category":{"name":"4 Wheel Drive"}}');

-- Apparel -> Jewelry & Accessories / Shoes --

INSERT INTO Category (id, category) VALUES ('ed269d40-40e9-4a08-b01f-4164632d17ef','{"category":{"name":"Apparel"}}');

INSERT INTO Category (id, parentCategory, category) VALUES ('4c556a74-69ef-49cf-bec2-6ffa0a19bcc0','ed269d40-40e9-4a08-b01f-4164632d17ef','{"category":{"name":"Jewelry & Accessories"}}');

INSERT INTO Category (id, parentCategory, category) VALUES ('1e358d58-04ee-4b28-b7e2-f97a7f61d034','ed269d40-40e9-4a08-b01f-4164632d17ef','{"category":{"name":"Shoes"}}');

DELETE FROM Listing;
INSERT INTO Listing (id, category, member, listing) VALUES ('257c87ea-2cdb-4219-b6f3-e6912ee2817f','465836c4-5f97-45a6-ba90-fe0966a18428','e3c75a5b-f6a5-4c3f-8b1d-42c110eb4f85', '{"listing":{"author":"Tyrus Sjostrom","title":"Awesome BMW i8","price":"$40,000","content":{"description":"Great condition, only 23k miles.","img":"https://images.unsplash.com/photo-1607853554439-0069ec0f29b6"},"date":"2021-02-15T00:27:13Z"}}');

INSERT INTO Listing (id, category, member, listing) VALUES ('4a1947b7-15be-415b-a023-bf73b8bb30c4','1e358d58-04ee-4b28-b7e2-f97a7f61d034','e3c75a5b-f6a5-4c3f-8b1d-42c110eb4f85', '{"listing":{"author":"Tyrus Sjostrom","title":"Travis Scott X AJ1","price":"$220","content":{"description":"Travis Scott X AJ1 Retro High Mocha.","img":"https://images.unsplash.com/photo-1559479083-f3b234ad0d53"},"date":"2021-02-15T00:28:11Z"}}');

INSERT INTO Listing (id, category, member, listing) VALUES ('7baf6e40-e3d9-427e-a79c-27a8ca507016','465836c4-5f97-45a6-ba90-fe0966a18428','9bf2a29d-8929-4e84-9e61-a189a4b3b7e9', '{"listing":{"author":"Astrid Bristoe","title":"My Audi","price":"$50,000","content":{"description":"Selling or trading for something of equal value.","img":"https://images.unsplash.com/photo-1540066019607-e5f69323a8dc"},"date":"2021-01-21T00:04:29Z"}}');

INSERT INTO Listing (id, category, member, listing) VALUES ('37d95ebb-5684-4d0f-9c5d-82e1bbc1d84a','1e358d58-04ee-4b28-b7e2-f97a7f61d034','9bf2a29d-8929-4e84-9e61-a189a4b3b7e9', '{"listing":{"author":"Astrid Bristoe","title":"AirForce 1s white","price":"$250","content":{"description":"Great condition, missing soles, in original box.","img":"https://images.unsplash.com/photo-1597350584914-55bb62285896"},"date":"2021-01-21T00:05:28Z"}}');

INSERT INTO Listing (id, category, member, listing) VALUES ('eeb0205e-9707-49e0-9e8f-30148868b6c8','cfc0d91f-9cfe-4ee3-8f02-edc7877ee8db','9bf2a29d-8929-4e84-9e61-a189a4b3b7e9', '{"listing":{"author":"Astrid Bristoe","title":"Ford F150","price":"$42,000","content":{"description":"Do not insult me with low offers.","img":"https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe"},"date":"2021-02-01T14:46:31Z"}}');

INSERT INTO Listing (id, category, member, listing) VALUES ('bd9fe197-9fd7-428d-a03e-080d058f99d5','4c556a74-69ef-49cf-bec2-6ffa0a19bcc0','9bf2a29d-8929-4e84-9e61-a189a4b3b7e9', '{"listing":{"author":"Astrid Bristoe","title":"Chrome Hearts double cross pendant","price":"$1500","content":{"description":"Real 925 Silver","img":"https://images.unsplash.com/photo-1631965004544-1762fc696476"},"date":"2021-04-13T23:06:25Z"}}');

INSERT INTO Listing (id, category, member, listing) VALUES ('7f25d0a4-8341-4dc5-8692-f109acda58bf','8f60ef24-fdac-40c4-b46b-4bdf9e97d9e0','e3c75a5b-f6a5-4c3f-8b1d-42c110eb4f85', '{"listing":{"author":"Astrid Bristoe","title":"Honda Odyssey","price":"$48,000","content":{"description":"Perfect for big families.","img":"https://images.unsplash.com/photo-1634698044343-14012cb36481"},"date":"2021-05-28T17:10:36Z"}}');

INSERT INTO Listing (id, category, member, listing) VALUES ('0b514c93-49ed-4040-b8cf-7045fb099f1c','a30c1c1d-7947-40a0-84ef-2f0af549034c','e3c75a5b-f6a5-4c3f-8b1d-42c110eb4f85', '{"listing":{"author":"Astrid Bristoe","title":"Toyota Sienna 4WD","price":"$53,000","content":{"description":"4WD can go to many places.","img":"https://images.unsplash.com/photo-1634698044343-14012cb36481"},"date":"2021-10-23T20:24:55Z"}}');

INSERT INTO Listing (id, category, member, listing) VALUES ('2e752229-b0ba-4f49-ae85-9f657b7be544','4c556a74-69ef-49cf-bec2-6ffa0a19bcc0','9bf2a29d-8929-4e84-9e61-a189a4b3b7e9', '{"listing":{"author":"Astrid Bristoe","title":"Chrome Hearts cemetery ring","price":"$600","content":{"description":"Real 925 Silver","img":"https://images.unsplash.com/photo-1631832721838-44118cd1fad8"},"date":"2021-10-07T04:59:21Z"}}');

INSERT INTO Listing (id, category, member, listing) VALUES ('0d5962ad-fc33-42d0-a356-38468bb01096','59d3e077-bcfc-4241-a487-2ace1502998a','9bf2a29d-8929-4e84-9e61-a189a4b3b7e9', '{"listing":{"author":"Astrid Bristoe","title":"2007 Honda Shadow","price":"$25,000","content":{"description":"New, great conditon","img":"https://images.unsplash.com/photo-1558981001-5864b3250a69"},"date":"2021-07-19T10:13:11Z"}}');
