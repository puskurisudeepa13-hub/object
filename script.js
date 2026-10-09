// ================================
// GESTURE RACING GAME
// ================================

const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;


// ================================
// GAME VARIABLES
// ================================

let gameRunning = false;

let score = 0;

let distance = 0;

let speed = 0;

let roadMove = 0;

let lastTime = 0;


// ================================
// CAR
// ================================

const car = {

    x: 400,

    y: 480,

    width: 60,

    height: 100,

    speed: 300
};


// ================================
// ENEMY CARS
// ================================

let enemies = [];


// ================================
// KEYBOARD
// ================================

let leftPressed = false;

let rightPressed = false;

let brakePressed = false;


// ================================
// KEY DOWN
// ================================

document.addEventListener("keydown", function(event) {

    if (
        event.key === "ArrowLeft" ||
        event.key.toLowerCase() === "a"
    ) {

        leftPressed = true;
    }

    if (
        event.key === "ArrowRight" ||
        event.key.toLowerCase() === "d"
    ) {

        rightPressed = true;
    }

    if (
        event.key === "ArrowDown" ||
        event.key.toLowerCase() === "s"
    ) {

        brakePressed = true;
    }

});


// ================================
// KEY UP
// ================================

document.addEventListener("keyup", function(event) {

    if (
        event.key === "ArrowLeft" ||
        event.key.toLowerCase() === "a"
    ) {

        leftPressed = false;
    }

    if (
        event.key === "ArrowRight" ||
        event.key.toLowerCase() === "d"
    ) {

        rightPressed = false;
    }

    if (
        event.key === "ArrowDown" ||
        event.key.toLowerCase() === "s"
    ) {

        brakePressed = false;
    }

});


// ================================
// DRAW ROAD
// ================================

function drawRoad() {

    // Grass

    ctx.fillStyle = "#176b32";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Road

    ctx.fillStyle = "#333";

    ctx.fillRect(
        120,
        0,
        560,
        canvas.height
    );


    // Road borders

    ctx.fillStyle = "white";

    ctx.fillRect(
        120,
        0,
        8,
        canvas.height
    );

    ctx.fillRect(
        672,
        0,
        8,
        canvas.height
    );


    // Lane lines

    ctx.fillStyle = "#ffffff";

    for (
        let y = -60 + roadMove;
        y < canvas.height;
        y += 100
    ) {

        ctx.fillRect(
            300,
            y,
            8,
            60
        );

        ctx.fillRect(
            490,
            y,
            8,
            60
        );

    }

}


// ================================
// DRAW PLAYER CAR
// ================================

function drawPlayerCar() {

    const x = car.x;

    const y = car.y;


    // Shadow

    ctx.fillStyle = "rgba(0,0,0,0.4)";

    ctx.fillRect(
        x - 28,
        y - 42,
        56,
        90
    );


    // Car body

    ctx.fillStyle = "#16a34a";

    ctx.beginPath();

    ctx.roundRect(
        x - 30,
        y - 50,
        60,
        100,
        12
    );

    ctx.fill();


    // Car roof

    ctx.fillStyle = "#075e32";

    ctx.fillRect(
        x - 22,
        y - 20,
        44,
        45
    );


    // Windows

    ctx.fillStyle = "#7dd3fc";

    ctx.fillRect(
        x - 17,
        y - 15,
        34,
        15
    );

    ctx.fillRect(
        x - 17,
        y + 5,
        34,
        13
    );


    // Wheels

    ctx.fillStyle = "#050505";

    ctx.fillRect(
        x - 35,
        y - 30,
        7,
        25
    );

    ctx.fillRect(
        x + 28,
        y - 30,
        7,
        25
    );

    ctx.fillRect(
        x - 35,
        y + 20,
        7,
        25
    );

    ctx.fillRect(
        x + 28,
        y + 20,
        7,
        25
    );


    // Headlights

    ctx.fillStyle = "#fff7a8";

    ctx.fillRect(
        x - 20,
        y - 44,
        13,
        6
    );

    ctx.fillRect(
        x + 7,
        y - 44,
        13,
        6
    );

}


// ================================
// DRAW ENEMY
// ================================

function drawEnemy(enemy) {

    ctx.fillStyle = "#ef4444";

    ctx.beginPath();

    ctx.roundRect(
        enemy.x - 28,
        enemy.y - 45,
        56,
        90,
        10
    );

    ctx.fill();


    // Windows

    ctx.fillStyle = "#60a5fa";

    ctx.fillRect(
        enemy.x - 18,
        enemy.y - 20,
        36,
        30
    );


    // Wheels

    ctx.fillStyle = "black";

    ctx.fillRect(
        enemy.x - 33,
        enemy.y - 30,
        7,
        22
    );

    ctx.fillRect(
        enemy.x + 26,
        enemy.y - 30,
        7,
        22
    );

    ctx.fillRect(
        enemy.x - 33,
        enemy.y + 15,
        7,
        22
    );

    ctx.fillRect(
        enemy.x + 26,
        enemy.y + 15,
        7,
        22
    );

}


// ================================
// CREATE ENEMY
// ================================

function createEnemy() {

    const lanes = [
        215,
        400,
        585
    ];

    const randomLane =
        lanes[
            Math.floor(
                Math.random() * lanes.length
            )
        ];

    enemies.push({

        x: randomLane,

        y: -100,

        speed:
            150 +
            Math.random() * 100

    });

}


// ================================
// COLLISION
// ================================

function checkCollision(enemy) {

    const distanceX =
        Math.abs(
            car.x - enemy.x
        );

    const distanceY =
        Math.abs(
            car.y - enemy.y
        );


    if (
        distanceX < 55 &&
        distanceY < 80
    ) {

        return true;
    }

    return false;
}


// ================================
// GAME OVER
// ================================

function gameOver() {

    gameRunning = false;

    alert(
        "💥 GAME OVER!\n\n" +
        "Your Score: " +
        Math.floor(score)
    );

}


// ================================
// UPDATE GAME
// ================================

function updateGame(deltaTime) {

    // Speed

    if (gesture === "OPEN PALM") {

        speed = 350;

    }

    else if (gesture === "FIST") {

        speed = 80;

    }

    else {

        speed = 220;

    }


    if (brakePressed) {

        speed = 80;

    }


    // Keyboard movement

    if (leftPressed) {

        car.x -=
            car.speed *
            deltaTime;

    }

    if (rightPressed) {

        car.x +=
            car.speed *
            deltaTime;

    }


    // Gesture steering

    if (gestureSteering < -0.2) {

        car.x -=
            car.speed *
            deltaTime;

    }

    if (gestureSteering > 0.2) {

        car.x +=
            car.speed *
            deltaTime;

    }


    // Keep car inside road

    if (car.x < 165) {

        car.x = 165;

    }

    if (car.x > 635) {

        car.x = 635;

    }


    // Road movement

    roadMove +=
        speed *
        deltaTime;

    if (roadMove > 100) {

        roadMove = 0;

    }


    // Score

    score +=
        speed *
        deltaTime *
        0.05;


    distance +=
        speed *
        deltaTime *
        0.03;


    // Create enemies

    if (
        Math.random() <
        0.015
    ) {

        createEnemy();

    }


    // Move enemies

    enemies.forEach(function(enemy) {

        enemy.y +=
            enemy.speed *
            deltaTime;

    });


    // Collision

    enemies.forEach(function(enemy) {

        if (checkCollision(enemy)) {

            gameOver();

        }

    });


    // Remove enemies

    enemies =
        enemies.filter(
            enemy =>
                enemy.y <
                canvas.height + 100
        );


    // Update display

    document.getElementById(
        "speed"
    ).innerText =
        Math.floor(speed);

    document.getElementById(
        "score"
    ).innerText =
        Math.floor(score);

    document.getElementById(
        "distance"
    ).innerText =
        Math.floor(distance);

}


// ================================
// DRAW GAME
// ================================

function drawGame() {

    drawRoad();

    enemies.forEach(
        drawEnemy
    );

    drawPlayerCar();

}


// ================================
// GAME LOOP
// ================================

function gameLoop(time) {

    const deltaTime =
        (time - lastTime) / 1000;

    lastTime = time;


    if (gameRunning) {

        updateGame(
            Math.min(
                deltaTime,
                0.05
            )
        );

    }


    drawGame();


    requestAnimationFrame(
        gameLoop
    );

}


requestAnimationFrame(
    gameLoop
);


// ================================
// START GAME
// ================================

document
    .getElementById("startButton")
    .addEventListener(
        "click",
        function() {

            score = 0;

            distance = 0;

            speed = 0;

            enemies = [];

            car.x = 400;

            gameRunning = true;

            startCamera();

        }
    );


// =====================================================
// HAND GESTURE CONTROL
// =====================================================

const video =
    document.getElementById("video");

const gestureText =
    document.getElementById("gesture");

let gesture =
    "WAITING";

let gestureSteering = 0;


// ================================
// MEDIAPIPE HANDS
// ================================

const hands =
    new Hands({

        locateFile: function(file) {

            return (
                "https://cdn.jsdelivr.net/npm/@mediapipe/hands/" +
                file
            );

        }

    });


hands.setOptions({

    maxNumHands: 1,

    modelComplexity: 1,

    minDetectionConfidence: 0.6,

    minTrackingConfidence: 0.6

});


// ================================
// HAND RESULTS
// ================================

hands.onResults(
    function(results) {

        if (
            !results.multiHandLandmarks ||
            results.multiHandLandmarks.length === 0
        ) {

            gesture =
                "NO HAND";

            gestureText.innerText =
                "NO HAND";

            gestureSteering = 0;

            return;

        }


        const hand =
            results.multiHandLandmarks[0];


        // Palm position

        const palm =
            hand[9];


        // LEFT / RIGHT

        gestureSteering =
            (palm.x - 0.5) * 3;


        // Finger detection

        const index =
            hand[8].y <
            hand[6].y;

        const middle =
            hand[12].y <
            hand[10].y;

        const ring =
            hand[16].y <
            hand[14].y;

        const pinky =
            hand[20].y <
            hand[18].y;


        const fingers =
            [
                index,
                middle,
                ring,
                pinky
            ];


        const count =
            fingers.filter(
                Boolean
            ).length;


        // OPEN PALM

        if (count >= 3) {

            gesture =
                "OPEN PALM";

        }


        // FIST

        else if (count === 0) {

            gesture =
                "FIST";

        }


        // STEERING

        else {

            gesture =
                "STEER";

        }


        gestureText.innerText =
            gesture;

    }
);


// ================================
// START CAMERA
// ================================

let cameraStarted = false;


function startCamera() {

    if (cameraStarted) {

        return;

    }


    cameraStarted = true;


    const camera =
        new Camera(
            video,
            {

                onFrame:
                    async function() {

                        await hands.send({
                            image: video
                        });

                    },

                width: 640,

                height: 480

            }
        );


    camera.start();

}