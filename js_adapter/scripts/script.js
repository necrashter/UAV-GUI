document.addEventListener('DOMContentLoaded', () =>{

	const baglanTusu = document.getElementById("baglanTusu");

	baglanTusu.addEventListener("click",baglan);

	var data = "";

	async function baglan(){
		const port = await navigator.serial.requestPort();



		await port.open({
			"baudRate" : "9600",
			"bufferSize":"1800"
		});
		 //port.bufferSize = 53

		const textDecoder = new TextDecoderStream();
		const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
		const reader = textDecoder.readable.getReader();

		var splitData;
		let utf8Encode = new TextEncoder();


//-------------------------- do it in the loop function ----------
		while (true) {
		  var { value, done } = await reader.read();
		  if (done) {
		    // Allow the serial port to be closed later.
		    reader.releaseLock();
		    break;
		  }

		  // value is a Uint8Array.
			//value = utf8Encode.encode(value);
			//console.log(value);

			if(value.includes("\n")){
				splitData = value.split("\n");

				data += splitData[0];

				for (var i = 0; i < data.length; i+=4){
					bData = [data[i+3], data[i+2], data[i+1], data[i]];
					//bData.reverse
					var buf = new ArrayBuffer(4);
					// Create a data view of it
					var view = new DataView(buf);
					console.log(view);

					//set bytes
					bData.forEach(function (b, i) {
					    view.setUint8(i, b);
					});

					// Read the bits as a float; note that by doing this, we're implicitly
					// converting it from a 32-bit float into JavaScript's native 64-bit double
					// var num = view.getFloat32(0);
					// console.log(num);
				}

				data = splitData[1];
			}//endIf
		}//endWhile

		//----------------------------------------------------------------
	}
});
