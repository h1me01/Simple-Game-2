const Levels = (diff) => {
    let canvas = document.getElementById('canvas'),
        counterErgebnis = document.getElementById('counter'),
        ctx = canvas.getContext('2d'),
        rows = cols = 20,
        cellHeight = canvas.width / rows,
        cellWidth = canvas.height / cols,
        enemy = [],
        spawnCr = [],
        counter = 1,
        character = {
            x: 10,
            y: 17
        };


    counterErgebnis.innerHTML = "Counter: 0";

    document.addEventListener('keydown', function(e) {
        if (e.keyCode == 37) {
            character.x--;
        } else if (e.keyCode == 39) {
            character.x++;
        } else if (e.keyCode == 40) {
            character.y++;
        } else if (e.keyCode == 38) {
            character.y--;
        }
    });

    const Add = (x, y) => {
        ctx.fillRect(x * cellWidth, y * cellHeight, cols, rows);
    }

    const Collect = () => {
        let bonus = {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20)
        }

        spawnCr.push(bonus);
    }

    const Enemy = () => {
        let enemyt = {
            x: Math.floor(Math.random() * 20),
            y: 0
        }

        enemy.push(enemyt);
        enemy.forEach((enemyt) => {
            enemyt.y += 1;
        });
    }

    const Check = () => {
        enemy.forEach(function(enemyt) {
            if ((character.x == enemyt.x && character.y == enemyt.y) || character.x >= cols || character.y >= rows || character.x < 0 || character.y < 0) {
                enemy.forEach(part => Object.freeze(part));
                Object.freeze(character);
            }
        });

        spawnCr.forEach(function(bonus) {
            if (bonus.x == character.x && bonus.y == character.y) {
                counterErgebnis.innerHTML = 'Counter: ' + counter++;
                bonus.x = Math.floor(Math.random() * 20);
                bonus.y = Math.floor(Math.random() * 20);
                console.log(counter);
            }
        });
    }

    const Draw = () => {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'green';
        Add(character.x, character.y);

        ctx.fillStyle = 'red';

        enemy.forEach(function(enemyt) {
            Add(enemyt.x, enemyt.y);
        });

        ctx.fillStyle = 'blue';

        spawnCr.forEach(function(bonus) {
            Add(bonus.x, bonus.y);
        });

        requestAnimationFrame(Draw);
    }

    Collect();
    setInterval(Check, 100);
    setInterval(Enemy, diff);
    Draw();
}

$(function() {
    $('.btn').on('click', function() {
        if ($(this).text() == 'Level 1') {
            Levels(600);
        } else if ($(this).text() == 'Level 2') {
            Levels(500);
        } else if ($(this).text() == 'Level 3') {
            Levels(400);
        } else if ($(this).text() == 'Level 4') {
            Levels(300);
        } else if ($(this).text() == 'Level 5') {
            Levels(200);
        } else if ($(this).text() == 'Restart') {
            document.location.reload();
        }
    });
});