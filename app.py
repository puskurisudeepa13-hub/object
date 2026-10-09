from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

SCORE_FILE = "scores.json"


def load_scores():
    if not os.path.exists(SCORE_FILE):
        return []

    try:
        with open(SCORE_FILE, "r") as file:
            return json.load(file)
    except:
        return []


def save_scores(scores):
    with open(SCORE_FILE, "w") as file:
        json.dump(scores, file, indent=4)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/scores", methods=["GET"])
def get_scores():

    scores = load_scores()

    scores.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return jsonify(scores[:10])


@app.route("/api/scores", methods=["POST"])
def add_score():

    data = request.get_json()

    name = data.get(
        "name",
        "Player"
    )

    score = data.get(
        "score",
        0
    )

    scores = load_scores()

    scores.append({
        "name": name,
        "score": int(score)
    })

    save_scores(scores)

    return jsonify({
        "message": "Score saved successfully"
    })


if __name__ == "__main__":
    app.run(
        debug=True,
        host="127.0.0.1",
        port=5000
    )