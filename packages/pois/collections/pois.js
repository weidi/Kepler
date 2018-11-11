
Pois = new Mongo.Collection('pois');

//TODO include in K.extend(...)
findPoisByLoc = function(ll) {

	return Pois.find({
			'geometry': {
				'$near': {
					'$geometry': {
						'type': 'Point',
						'coordinates': [ll[1],ll[0]]
					},
					'$maxDistance': K.settings.public.pois.maxDistance
				}
			}
		}, {
			limit: K.settings.public.pois.limit
		});
}