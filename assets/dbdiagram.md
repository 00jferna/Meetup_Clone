## DBdiagram.io code
```

Table users {
  id int [pk]
  firstName varchar
  lastName varchar
  email varchar
  username varchar
  password varchar
  created datetime
  updated datetime
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
  created datetime
  updated datetime
}

Table eventImages {
  id int [pk]
  url varchar
  eventId int [ref: > events.id]
  preview boolean
  created datetime
  updated datetime
}

Table groupImages {
  id int [pk]
  url varchar
  groupId int [ref: > groups.id]
  preview boolean
  created datetime
  updated datetime
}

Table venues {
  id int [pk]
  address varchar
  city varchar
  state varchar
  lat float
  lng float
  created datetime
  updated datetime
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
  created datetime
  updated datetime
}

Table attendances {
  id int [pk]
  status varchar
  userId varchar [ref: > users.id]
  eventId varchar [ref: > events.id]
  created datetime
  updated datetime
}

Table memberships {
  id int [pk]
  status varchar
  userId int [ref: > users.id]
  groupId int [ref: > groups.id]
  created datetime
  updated datetime
}

```