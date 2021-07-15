class Telemetri{
	let pitch;
	let roll;
	let yaw;
	let spd;
	let vert_spd;
	let altitude;
	let longitude;
	let latitude;
	let battery;
	let current;

	let elevator;
	let throttle;
	let rudder;


	constructor(baglanTusu){
		this.baglanTusu = baglanTusu;
		this.baglanTusu.addEventListener("click",this.baglan);
	}


	async function baglan(){
		const port = await navigator.serial.requestPort();
		console.log(port);
	};

}
