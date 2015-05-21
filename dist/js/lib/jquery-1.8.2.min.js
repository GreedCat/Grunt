$(function(){
	function calculate(a,b){
		this.a = a;
		this.b = b;
		console.log(a*b+50*100-200/2);
	}
	calculate(20,30);
});