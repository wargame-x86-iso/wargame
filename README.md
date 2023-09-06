# Wargame

### React Frontend

### Socket/Express Backend

### Rules

#### Building an army:


#### Creating a match:



#### Winning the match:

The game ends when 10 turns have elapsed or when one side looses their company command unit

The side with the most victory points after 10 turns wins

Players receives victory points for each objective they control at the end of their turn

2 victory points per uncontested objective
1 victory points per contested objective

An objective is held if the player has a unit within 3 spaces of the objective

An objective is contested if the opposing player also holds that objective

#### Turn structure:

Each unit can spend 3 action points per turn:

1 action point - move up to 50% of movement range
2 action points - move up to 100% of movement range
1 action point - shoot both weapons at 50% rof each
2 action point - shoot both weapons at 100% rof each
1 action point - use a peice of gear
1 action point - use an ability

units will automatically shoot at the maximum rof they can afford (no option to choose 50% rof)

### Movement


### Shooting

Units are equiped with up to two weapons and both can be shoot each per turn.

The rof stat of the weapon determines how many chances to hit the enemy it has

The accuracy of the weapon and the distance fired determine likelyhood of each chance succeeding 

The damage of the weapon determines how much damage per hit is done to the other unit

The armor of the other unit reduces the amount of damage per hit

### Gear

A piece of gear can be used once

### Abilities

Abilities have a cooldown period and never run out.

Using an ability can add or remove attributes from other units

Some examples:

- The company HQ has the ability to spot targets for artillery adding the spotted attribute to a group of spaces
- The sniper unit has the conceal ability and can add the concealed attribute to itself
- Light tank units with advanced optics have the scan ability which can remove the concealed attribute from units in a group of spaces

### Unit Attributes

Atttributes can apply to units.

Some attributes apply to the unit throughout the entire game and some are temporary.

Attributes can tweak the rules for specific units. 

Some examples:
- Units with the suppressed attribute can spend -1 action points per turn
- Units with the conscript attribute receive -1 accuracy when firing a weapon
- Units with the concealed attribute cannot be seen by the other player unless they attempt to move over the space
- Units with the pioneer attribute can see mines within a few spaces of them

### Weapon Attributes

Atttributes can apply to weapons.


### Terrian Attributes

