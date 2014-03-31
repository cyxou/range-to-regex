/* depends on lo-dash */

function regex4range(min, max) {
	// regex_for_range(12, 345)
	// "1[2-9]|[2-9]\d|[1-2]\d{2}|3[0-3]\d|34[0-5]"
	var subpatterns = [];
	var start = min;

	_.forEach(split2ranges(min, max), function(stop) {
		subpatterns.push(range2pattern(start, stop));
		start = stop + 1;
	});
	return subpatterns.join('|');
}

function split2ranges(min, max) {
	var stops = [max];

	var count = 1;
	var stop = fillByChar(min, '9', count);

	while (min <= stop && stop < max) {
		stops.push(stop);
		count += 1;
		stop = fillByChar(min, '9', count);
	}

	var zeros_count = 1;
	stop = fillByChar(max, '0', zeros_count) - 1;
	while (min < stop && stop < max) {
		stops.push(stop);
		zeros_count += 1;
		stop = fillByChar(max, '0', zeros_count) - 1;
	}
	stops = _.uniq(stops);
	stops = _.sortBy(stops);

	return stops;
}

function fillByChar(int, ch, count) {
	// replace last caracters by 9
	// (217,1) returns 219
	// (217,2) returns 299
	// (217,3) returns 999

	int = int.toString();
	int = int.substring(0, int.length - count);
	for (var i = 1; i <= count; i += 1) {
		int += ch;
	}

	return parseInt(int, 10);
}

function range2pattern(start, stop) {
	start = start.toString();
	stop = stop.toString();

	var pattern = '';
	var anyDigitCount = 0;

	// merge arrays
	var merged = [];
	for (var i = 0; i < stop.length; i += 1) {
		var foo = [];
		foo.push(start[i] || '');
		foo.push(stop[i]);
		merged.push(foo);
	}

	for (var j = 0; j < merged.length; j += 1) {
		startDigit = merged[j][0];
		stopDigit = merged[j][1];

		if (startDigit === stopDigit)
			pattern += startDigit;
		else if (startDigit !== '0' || stopDigit !== '9')
			pattern += '[' + startDigit + '-' + stopDigit + ']';
		else
			anyDigitCount += 1;
	}
	if (anyDigitCount) pattern += '\\d';
	if (anyDigitCount > 1) pattern += '{' + anyDigitCount + '}';

	return pattern;
}
