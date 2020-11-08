//xd
JSON.stringify(Array.from(Array(100).keys()).map(i => ({
	"id": i + 1,
	"image": null,
	"price": Math.floor(Math.random() * 1000000),
	"newerprice": Math.floor(Math.random() * 1000000),
	"authorname": "foo",
	"title": "foo",
	"area": Math.floor(Math.random() * 1000000),
	"baths": Math.floor(Math.random() * 10),
	"rooms": Math.floor(Math.random() * 10),
})))