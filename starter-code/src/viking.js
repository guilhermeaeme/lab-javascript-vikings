// Soldier
function Soldier(health, strength) {
	this.health = health;
	this.strength = strength;

	this.attack = () => {
		return this.strength;
	}

	this.receiveDamage = (damage) => {
		this.health -= damage;
	}
}

// Viking
function Viking(name, health, strength) {
	Soldier.call(this, health, strength);

	this.name = name;

	this.receiveDamage = (damage) => {
		this.health -= damage;

		if(this.health > 0) {
			return `${this.name} has received ${damage} points of damage`;
		} else {
			return `${this.name} has died in act of combat`;
		}
	}

	this.battleCry = () => {
		return `Odin Owns You All!`;
	}
}

Viking.prototype = Object.create(Soldier.prototype);
Viking.prototype.constructor = Viking;

// Saxon
function Saxon(health, strength) {
	Soldier.call(this, health, strength);

	this.receiveDamage = (damage) => {
		this.health -= damage;

		if(this.health > 0) {
			return `A Saxon has received ${damage} points of damage`;
		} else {
			return `A Saxon has died in combat`;
		}
	}
}

Saxon.prototype = Object.create(Soldier.prototype);
Saxon.prototype.constructor = Saxon;

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function randomSelector(allItems) {
	return allItems[getRandomInt(0, allItems.length)];
}

// War
function War() {
	this.vikingArmy = [];
	this.saxonArmy = [];

	this.addViking = (viking) => {
		this.vikingArmy.push(viking);
	}

	this.addSaxon = (saxon) => {
		this.saxonArmy.push(saxon);
	}

	this.vikingAttack = () => {
		let saxon = randomSelector(this.saxonArmy);
		let viking = randomSelector(this.vikingArmy);

		let result = saxon.receiveDamage(viking.attack());

		this.saxonArmy = this.saxonArmy.filter(item => item.health > 0);

		return result;
	}

	this.saxonAttack = () => {
		let saxon = randomSelector(this.saxonArmy);
		let viking = randomSelector(this.vikingArmy);

		let result = viking.receiveDamage(saxon.attack());

		this.vikingArmy = this.vikingArmy.filter(item => item.health > 0);

		return result;
	}

	this.showStatus = () => {
		if(this.saxonArmy.length == 0) {
			return `Vikings have won the war of the century!`;
		} else if(this.vikingArmy.length == 0) {
			return `Saxons have fought for their lives and survive another day...`;
		} else {
			return `Vikings and Saxons are still in the thick of battle.`;
		}
	}

}

