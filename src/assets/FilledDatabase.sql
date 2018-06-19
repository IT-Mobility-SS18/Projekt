CREATE TABLE "Orders" ( `OrderId` INTEGER NOT NULL, `Name` TEXT, `Price` NUMERIC, `Quantity` INTEGER, `Picture` TEXT, `DeliveryCosts` NUMERIC, `OrderState` TEXT, `TimeStamp` TEXT, `RestaurantId` INTEGER NOT NULL, `PayStatus` TEXT, `Annotations` TEXT, `UserId` INTEGER NOT NULL, `TableId` TEXT, `ItemId` INTEGER, PRIMARY KEY(`OrderId`,`RestaurantId`,`UserId`) );
INSERT INTO Orders(OrderId, Name, Price, Quantity, Picture, DeliveryCosts, OrderState, TimeStamp, RestaurantId, PayStatus, Annotations, UserId, TableId, ItemId) VALUES (3243, 'Vorspeisenteller', 5.55, 1, null, 0, 'open', '2018-01-01-09-00-00', 45, 'not paid', '', 456, '6', 1);
INSERT INTO Orders(OrderId, Name, Price, Quantity, Picture, DeliveryCosts, OrderState, TimeStamp, RestaurantId, PayStatus, Annotations, UserId, TableId, ItemId) VALUES (3457, 'Hühnchen', 6.50, 1, null, 0, 'delivered', '2018-01-01-09-00-00', 45, 'not paid', '', 456, '6', 2);
INSERT INTO Orders(OrderId, Name, Price, Quantity, Picture, DeliveryCosts, OrderState, TimeStamp, RestaurantId, PayStatus, Annotations, UserId, TableId, ItemId) VALUES (3458, 'Großer gemischter Salatteller', 12.50, 2, null, 0, 'open', '2018-01-01-09-00-00', 45, 'not paid', '', 456, '6', 3);



CREATE TABLE `Items` ( `ItemId` INTEGER NOT NULL, `RestaurantId` INTEGER NOT NULL, `Category` TEXT, `Picture` TEXT, `Name` TEXT, `Price` NUMERIC, `Description` TEXT, `Size` TEXT, `Variants` TEXT, `Ingredients` TEXT, PRIMARY KEY(`ItemId`,`RestaurantId`) );
INSERT INTO Items(ItemId , RestaurantId,Category, Picture, Name , Price , Description , Size , Variants , Ingredients) VALUES (1, 45, 3, null, 'Vorspeisenteller', 5.55, 'Beschreibung des Produkts', 'normal', null, null);
INSERT INTO Items(ItemId , RestaurantId,Category, Picture, Name , Price , Description , Size , Variants , Ingredients) VALUES (2, 45, 2, null, 'Hühnchen', 6.50, 'Beschreibung des Produkts', 'normal', null, null);
INSERT INTO Items(ItemId , RestaurantId,Category, Picture, Name , Price , Description , Size , Variants , Ingredients) VALUES (3, 45, 1, null, 'Großer gemischter Salatteller', 12.50, 'Beschreibung des Produkts', 'groß', null, null);

CREATE TABLE "RestaurantUser" ( `RestaurantUserId` INTEGER NOT NULL, `Name` TEXT, `Password` TEXT, `Role` TEXT, PRIMARY KEY(`RestaurantUserId`) );
INSERT INTO RestaurantUser(RestaurantUserId,Name,Password,Role) VALUES (1, 'Hermann Bauer', null, 'service');
INSERT INTO RestaurantUser(RestaurantUserId,Name,Password,Role) VALUES (2, 'Tom Henssler', null, 'kitchen');
INSERT INTO RestaurantUser(RestaurantUserId,Name,Password,Role) VALUES (3, 'Don Corleone', null, 'management');

CREATE TABLE `Restaurants` ( `RestaurantId` INTEGER NOT NULL, `Name` TEXT, `OpeningTimes` TEXT, `Location` TEXT, PRIMARY KEY(`RestaurantId`) );
INSERT INTO Restaurants(RestaurantId,Name,OpeningTimes,Location) VALUES (45,'La Pizzeria','12:00-22:00', 'FFM');

CREATE TABLE "User" ( `UserId` INTEGER NOT NULL UNIQUE, `FirstName` TEXT, `LastName` TEXT, `Street` TEXT, `Zip` INTEGER, `City` TEXT, `Phone` INTEGER, `Sex` TEXT, `Mail` TEXT, `Password` TEXT, `OptInNewsletter` INTEGER, `UsualLoginLocations` TEXT, `PaymentMethod` TEXT, `PaymentData` TEXT, `Country` TEXT, PRIMARY KEY(`UserId`) );
INSERT INTO User(UserId,FirstName,LastName,Street,Zip,City,Phone,Sex,Mail,Password,OptInNewsletter, UsualLoginLocations, PaymentMethod, PaymentData,Country) VALUES (456, 'Armin', 'Meier','Einestraße 44', 39865, 'Bad Homburg', 23435465, 'm', 'meiera@web.de', null, 0, null,null,null, 'Germany');

CREATE TABLE `UserBasket` ( `ItemId` INTEGER NOT NULL, `UserId` INTEGER NOT NULL, `Quantity` INTEGER, PRIMARY KEY(`ItemId`,`UserId`) );
INSERT INTO UserBasket(ItemId,UserId,Quantity) VALUES (2,456,1);
INSERT INTO UserBasket(ItemId,UserId,Quantity) VALUES (3,456,3);

CREATE TABLE `UserFavorites` ( `UserId` INTEGER NOT NULL, `RestaurantName` TEXT NOT NULL, `Rating` INTEGER, PRIMARY KEY(`UserId`) );
