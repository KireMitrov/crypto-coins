 
 export default function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};


// export default function debounce (mainFunction, delay) {
//     // Declare a variable called 'timer' to store the timer ID
//     let timer;
  
//     // Return an anonymous function that takes in any number of arguments
//     return function (...args) {
//       // Clear the previous timer to prevent the execution of 'mainFunction'
//       clearTimeout(timer);
  
//       // Set a new timer that will execute 'mainFunction' after the specified delay
//       timer = setTimeout(() => {
//         mainFunction(...args);
//       }, delay);
//     };
//   };