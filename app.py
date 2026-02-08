from flask import Flask, render_template
import cloudinary_config
from cloudinary.api import resources_by_tag
from cloudinary.utils import cloudinary_url

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('pages/index.html')

@app.route("/gallery")
def gallery():
    result = resources_by_tag(
        "gallery",           
        resource_type="image",
        max_results=200
    )

    images = []
    for img in result["resources"]:
        optimized_url, _ = cloudinary_url(
            img["public_id"],
            width=600,
            crop="fill",
            quality="auto",
            fetch_format="auto"
        )
        images.append({"url": optimized_url})

    return render_template("pages/gallery.html", images=images)

@app.route("/films")
def films():
    return render_template("pages/films.html")

@app.route("/about")
def about():
    return render_template("pages/about.html")

@app.route("/contact")
def contact():
    return render_template("pages/contact.html")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)