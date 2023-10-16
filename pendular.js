$(document).ready(function () {
	var pendulum = $('#pendulum');
	var lengthSlider = $('#lengthSlider');
	var gravitySlider = $('#gravitySlider');
	var amplitudeSlider = $('#amplitudeSlider');
	var startStopButton = $('#startStopButton');

	var angle = 0;
	var length = parseFloat(lengthSlider.val());
	var gravity = parseFloat(gravitySlider.val());
	var amplitude = parseFloat(amplitudeSlider.val());
	var period = 2 * Math.PI * Math.sqrt(length / gravity);
	var isAnimating = false;
	var animationId;

	// Actualiza el valor de la longitud y gravedad en tiempo real
	lengthSlider.on('input', function () {
		length = parseFloat($(this).val());
		period = 2 * Math.PI * Math.sqrt(length / gravity);
		$('#lengthValue').text(length);
	});

	gravitySlider.on('input', function () {
		gravity = parseFloat($(this).val());
		period = 2 * Math.PI * Math.sqrt(length / gravity);
		$('#gravityValue').text(gravity);
	});

	amplitudeSlider.on('input', function () {
		amplitude = parseFloat($(this).val());
		$('#amplitudeValue').text(amplitude);
	});

	startStopButton.on('click', function () {
		isAnimating = !isAnimating;
		if (isAnimating) {
			startStopButton.text('Detener');
			startStopButton.data('state', 'stop');
			animatePendulum();
		} else {
			startStopButton.text('Iniciar');
			startStopButton.data('state', 'start');
			cancelAnimationFrame(animationId);
		}
	});

	// Agregar control mediante teclas
	$(document).on('keydown', function (e) {
		var key = e.key.toLowerCase();

		// Longitud
		switch (key) {
			case 'e':
				if (length < 10) {
					length += 0.1;
					lengthSlider.val(length);
					lengthSlider.trigger('input');
				}
				break;
			case 'q':
				if (length > 1) {
					length -= 0.1;
					lengthSlider.val(length);
					lengthSlider.trigger('input');
				}
				break;
			case 'w':
				length = 4;
				lengthSlider.val(length);
				lengthSlider.trigger('input');
				break;

			// Gravedad
			case 'a':
				gravity -= 0.1;
				gravitySlider.val(gravity);
				gravitySlider.trigger('input');
				break;
			case 's':
				gravity = 9.8;
				gravitySlider.val(gravity);
				gravitySlider.trigger('input');
				break;
			case 'd':
				gravity += 0.1;
				gravitySlider.val(gravity);
				gravitySlider.trigger('input');
				break;

			// Amplitud
			case 'z':
				if (amplitude > 10) {
					amplitude -= 1;
					amplitudeSlider.val(amplitude);
					amplitudeSlider.trigger('input');
				}
				break;
			case 'x':
				amplitude = 10;
				amplitudeSlider.val(amplitude);
				amplitudeSlider.trigger('input');
				break;
			case 'c':
				if (amplitude < 90) {
					amplitude += 1;
					amplitudeSlider.val(amplitude);
					amplitudeSlider.trigger('input');
				}
				break;
			case ' ':
				isAnimating = !isAnimating;
				if (isAnimating) {
					startStopButton.text('Detener');
					startStopButton.data('state', 'stop');
					animatePendulum();
				} else {
					startStopButton.text('Iniciar');
					startStopButton.data('state', 'start');
					cancelAnimationFrame(animationId);
				}
				break;
		}
	});

	function animatePendulum() {
		var currentTime = new Date().getTime();
		angle =
			amplitude * Math.sin(((2 * Math.PI) / period) * (currentTime / 1000));
		pendulum.css('transform', 'rotate(' + angle + 'deg');
		animationId = requestAnimationFrame(animatePendulum);
	}
});
