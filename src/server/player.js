const DynamicEntity = require('./dynamicEntity');
const Bullet = require('./bullet');
const Constants = require('../shared/constants');
const Crown = require('./crown');

class Player extends DynamicEntity {
    constructor(id, username, x, y, tankStyle) {
        super(id, x, y, Math.PI / 2, Constants.PLAYER_SPEED);
        this.username = username;
        this.hp = Constants.PLAYER_MAX_HP;
        this.fireCooldown = 0;
        this.score = 0;
        this.turretDirection = Math.random() * 2 * Math.PI; // Set Initial turret direction randomnly
        this.tankStyle = tankStyle;
        this.crownPowerup = null;     // powerups from crowns, at most one at a time
        this.fireCooldownSpeed = Constants.PLAYER_FIRE_COOLDOWN;
        this.bulletSpeed = Constants.BULLET_SPEED
    }

    update(dt) {
        super.update(dt);

        this.score += Constants.SCORE_PER_SECOND;

        // Make sure the player stays in bounds
        this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
        this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));

        this.fireCooldown -= dt;
        if (this.fireCooldown <= 0) {
            this.fireCooldown += this.fireCooldownSpeed;
            return new Bullet(this.id, this.x, this.y, this.turretDirection, this.bulletSpeed);
        }
        return null;
    }

    takeBulletDamage() {
        this.hp -= Constants.BULLET_DAMAGE;
    }

    onDealtDamage() {
        this.score += Constants.SCORE_BULLET_HIT;
    }

    serializeForUpdate() {
        return {
            ...(super.serializeForUpdate()),
            direction: this.direction,
            turretDirection: this.turretDirection,
            username: this.username,
            hp: this.hp,
            tankStyle: this.tankStyle,
        };
    }

    // return object to send out for nav map updates
    serializeForMapUpdate() {
        return {
            x: this.x,
            y: this.y
        }
    }

    // use this to set the turret direction on the game object
    setTurretDirection(dir) {
        this.turretDirection = dir;
    }

    // Change direction, only if new direction is adjacent to the current direction
    // directionKeyCode * MATH.PI == new direction
    updateTankDirection(directionKeyCode) {
        this.direction = directionKeyCode * Math.PI;
    }

    // Methods deal with adding and dropping crowned powerups
    addCrownPowerup(crown) {
        if (this.crownPowerup != null) {
            // implement this when you add more than one powerup
        }
        this.crownPowerup = crown.id;
        this.fireCooldownSpeed = Constants.RAPID_FIRE_COOLDOWN;
        this.bulletSpeed = Constants.RAPID_FIRE_BULLET_SPEED;
    }

    dropCrownPowerup() {
        if (this.crownPowerup) {
            return new Crown(this.crownPowerup, this.x, this.y);
        }
        return null;
    }
}

module.exports = Player;