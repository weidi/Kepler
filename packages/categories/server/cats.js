
Places.after.update(function(userId, doc, fieldNames, modifier, options) {

	if(_.contains(fieldNames,'cats') && modifier['$addToSet']) {

		var catData = {},
			cats = modifier.$addToSet.cats.$each;

		_.each(cats, function(cat) {

			catData = _.extend({}, K.schemas.cat, {
				name: cat,
				type: 'place'//user, place, all
			});

			console.log('Cats: after update',catData);

			Categories.insert(catData);
		});
	}

});
//TODO
/*Categories.before.insert(function(userId, doc) {
	doc.createdAt = K.Util.time();
});*/

Meteor.publish('catsActive', function() {

	if(this.userId)
	{
		var cur = K.findCatsActive();

		console.log('Pub: catsActive', cur.count());

		return cur;
	}
	else
		this.ready();
});

Meteor.publish('catsByName', function(name, type) {

	if(this.userId)
	{
		var cur = K.findCatsByName(name, type);

		console.log('Pub: catsByName', name, cur.count());

		return cur;
	}
	else
		this.ready();
});


//add settings cats to database
Meteor.startup(function() {

	var sets = K.settings.public.categories.cats,
		cats = [];

	_.each(sets.place, function(active, name) {	
		cats.push(_.extend({}, K.schemas.cat, {
			name: name,
			active: active,
			type: 'place'	//user, place, all
		}));
	});

	_.each(sets.user, function(active, name) {	
		cats.push(_.extend({}, K.schemas.cat, {
			name: name,
			active: active,
			type: 'user'	//user, place, all
		}));
	});

	var cc = 0;
	_.each(cats, function(cat){
		var ret = Categories.upsert({name: cat.name}, {
			$set: cat
		});
		cc =+ ret.numberAffected;
	});
	//TODO Cate
	console.log('Cats: update categories from settings...', cc, cats);

});