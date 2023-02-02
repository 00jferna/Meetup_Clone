## DBdiagram.io code
```
Table users {
  id int [pk]
  firstName varchar
  lastName varchar
  email varchar
  username varchar
}

Table groups {
  id int [pk]
  organizerId int [ref: > users.id]
  name varchar
  about varchar
  type varchar
  private boolean
  city varchar
  state varchar
  numMembers int
  previewImage varchar [ref: > images.id]
}

Table images {
  id int [pk]
  url varchar
  preview boolean
}

Table venues {
  id int [pk]
  address varchar
  city varchar
  state varchar
  lat float
  lng float
}

Table events {
  id int [pk]
  groupId int [ref: > groups.id]
  venueId int [ref: > venues.id]
  name varchar
  description varchar
  type varchar
  capacity int
  price float
  startDate datetime
  endDate datetime
  numAttending int
  previewImage varchar [ref: > images.id]
}

Table attendance {
  id int [pk]
  status varchar
  userId varchar [ref: > users.id]
  eventId varchar [ref: > events.id]
}

Table members {
  id int [pk]
  userId int [ref: > users.id]
  groupId int [ref: > groups.id]
}

```