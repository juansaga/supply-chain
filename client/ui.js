$(document).ready(function () {
	$("#search").change(function (e) {
		hideAll();
		$(e.target.options).removeClass();
		var $selectedOption = $(e.target.options[e.target.options.selectedIndex]);
		$selectedOption.addClass("selected");
		$("#" + $selectedOption.val()).show();
	});
});

$(document).ready(function () {
	$("#search2").change(function (e) {
		hideAll2();
		$(e.target.options).removeClass();
		var $selectedOption = $(e.target.options[e.target.options.selectedIndex]);
		$selectedOption.addClass("selected2");
		$("#" + $selectedOption.val()).show();
	});
});

function hideAll() {
	$("#productor").hide();
	$("#vehiculo").hide();
    $("#almacen").hide();
    $("#hotel").hide();
}
function hideAll2() {
	$("#productor2").hide();
	$("#vehiculo2").hide();
    $("#almacen2").hide();
    $("#hotel2").hide();
}


const taskForm = document.querySelector('#taskForm')
let counter = 0;
taskForm.addEventListener('submit', e => {
    e.preventDefault();

    let tipoUsuarioEnvia = taskForm["search"].value;
    let nombreUsuarioEnvia = taskForm[tipoUsuarioEnvia].value;
    let tipoUsuarioRecibe = taskForm["search2"].value;
    let nombreUsuarioRecibe = taskForm[tipoUsuarioRecibe].value;
    let producto = taskForm["producto"].value;
    let valor = taskForm["valorProducto"].value;

    let transaccion = `{producto: ${producto}, valor: ${valor}, envia: ${nombreUsuarioEnvia}, recibe: ${nombreUsuarioRecibe}}`;
    mempool[counter] = (transaccion);
    console.log(mempool);
    counter++;

    let l = document.createElement('li')
    let t = document.createTextNode(transaccion)
    l.appendChild(t)

    document.getElementById("mempool").appendChild(l)

})

const minar = document.querySelector('#minar')

minar.addEventListener('submit', e => {
    e.preventDefault()

    blockchain.mine()

    let currentBlock = blockchain.chain.length - 1

    document.getElementById("mempool").innerText = mempool

    let l = document.createElement('li')

    let t = document.createElement('ol')
    t.setAttribute('class', 'box1')
    l.appendChild(t)

    for (let d of blockchain.chain[currentBlock].data) {
        let k = document.createElement('li')
        let n = document.createTextNode(d)
        k.appendChild(n)
        t.appendChild(k)

    }

    document.getElementById('cadena').appendChild(l)

    counter = 0;
})

