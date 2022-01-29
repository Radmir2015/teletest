box.cfg{listen = 3301}

local people = box.schema.space.create('people', { format = {
    {name='id', type='unsigned'},
    {name='name', type='string'},
    {name='phone_number', type='string'},
    {name='extra', type='map'}
}, if_not_exists = true })

box.schema.user.grant('guest', 'read,write,execute', 'universe')

people:create_index('primary', { type="hash", parts={'id'}, if_not_exists = true })

function getFormat()
    return box.space.people:format()
end

function countPeople()
    return box.space.people:len()
end

people:insert({1, '123', '23456', {['b']= 2, ['c']= 2}})
people:insert({2, '234', '23457', {['b']= 2, ['c']= 13}})
people:insert({3, '345', '23458', {['b']= 2, ['c']= 14}})
people:insert({4, '435', '23459', {['b']= 2, ['c']= 19}})
people:insert({5, '456', '23450', {['b']= 2, ['c']= 16}})
people:insert({6, '756', '23450', {
["_id"] = "61f5999d0f447c3100ddc7e1",
["index"] = 0,
["guid"] = "0d8c3084-6d82-4c9a-b380-f9055bfb003c",
["isActive"] = true,
["balance"] = "$3,472.54",
["picture"] = "http://placehold.it/32x32",
["age"] = 20,
["eyeColor"] = "brown",
["name"] = "Goldie Castro",
["gender"] = "female",
["company"] = "MOLTONIC",
["email"] = "goldiecastro@moltonic.com",
["phone"] = "+1 (966) 488-3863",
["address"] = "324 Woodside Avenue, Wikieup, Guam, 9930",
["about"] = "Ullamco irure in consequat nisi culpa qui eu ut amet consectetur dolor. Irure magna laborum ex dolore. Quis do mollit anim et nulla amet nulla anim nostrud ea proident cupidatat dolor.\r\n",
["registered"] = "2021-10-11T09:48:07 -03:00",
["latitude"] = 74.629787,
["longitude"] = -1.915768,
["tags"] = {
  "ex",
  "velit",
  "culpa",
  "ex",
  "pariatur",
  "sit",
  "mollit"
}}})

box.space.people.index.primary:select()