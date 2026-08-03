const blogs = {


1:{

title:
"Why Professional Office Cleaning Matters For Your Business",

image:
"images/office.jpg",

author:
"David Mugisha - Operations Manager",

date:
"August 2026",

description:

`
A clean workplace is essential for productivity,
employee health, and creating a professional
image for your business.

Professional office cleaning removes dust,
germs, and allergens while creating a safer
environment for employees and visitors.

Our trained cleaning team uses modern equipment
and proven techniques to maintain offices at
the highest standards.

Investing in professional cleaning allows your
employees to focus on their work while experts
handle maintaining a clean workspace.
`

},



2:{

title:
"The Ultimate Guide To Maintaining A Clean And Healthy Home",

image:
"images/home.jpg",

author:
"Sarah Namukasa - Cleaning Supervisor",

date:
"August 2026",

description:

`
A clean home provides comfort, relaxation,
and a healthier environment for your family.

Maintaining cleanliness requires good habits
such as regular dusting, proper organization,
sanitizing surfaces, and creating a cleaning
routine.

With the right approach, you can keep your home
fresh and welcoming every day.
`

},



3:{

title:
"Effective Strategies For Deep Cleaning Your Home",

image:
"images/deep-clean.jpg",

author:
"Patrick Ssemanda - Deep Cleaning Specialist",

date:
"August 2026",

description:

`
Deep cleaning goes beyond normal cleaning by
targeting hidden dirt and neglected areas.

It involves cleaning carpets, windows,
bathrooms, kitchen surfaces, furniture, and
hard-to-reach places.

Professional deep cleaning improves hygiene,
removes allergens, and restores freshness
throughout your home.

A proper deep cleaning routine keeps your
living space healthier and more comfortable.
`

}


};



// Get blog ID from URL

const urlParams = new URLSearchParams(window.location.search);

const blogID = urlParams.get("id");



// Display blog

if(blogs[blogID]){


document.getElementById("blog-title").textContent =
blogs[blogID].title;


document.getElementById("blog-image").src =
blogs[blogID].image;


document.getElementById("blog-author").textContent =
blogs[blogID].author;


document.getElementById("blog-date").textContent =
blogs[blogID].date;


document.getElementById("blog-description").textContent =
blogs[blogID].description;


}
else{

document.querySelector(".details-container").innerHTML=
"<h2>Blog Not Found</h2>";

}