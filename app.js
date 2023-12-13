const products = []

function add_product(name, price, amount) {
	products.push({ name, price, amount: parseInt(amount) })

	remaining_products()
}

function transfer_product(name, amount)
{
	for (const product of products) {
		if (product.name == name)
		{
			product.amount -= parseInt(amount)

			if (product.amount < 0)
			{
				product.amount = 0
			}
		}
	}

	remaining_products()
}

function remaining_products()
{
	const remaining_products = document.querySelector('#remaining_products')
	remaining_products.replaceChildren()

	const cheapest_index = cheapest_product()

	for (let i = 0; i < products.length; i++) {
		ul = document.createElement('ul')

		if (i == cheapest_index)
		{
			li = document.createElement('li')
			li.textContent =`Cheapest Product!`
			li.classList.add('cheapest')
			ul.appendChild(li)
		}
		
		for (const properties of Object.keys(products[i])) {
			li = document.createElement('li')
			li.textContent =`${properties}: ${products[i][properties]}`
			ul.appendChild(li)
		}
		remaining_products.appendChild(ul)
	}
}

function cheapest_product()
{
	let cheapest_index = 0
	let cheapest_price = products[0].price

	for (let i = 0; i < products.length; i++) {
		if (products[i].price < cheapest_price)
		{
			cheapest_price = products[i].price
			cheapest_index = i
		}
	}

	return cheapest_index
}

function update_product(name, price, amount)
{
	for (const product of products) {
		if (product.name == name)
		{
			product.price = price
			product.amount = parseInt(amount)
		}
	}

	remaining_products()
}


// Add Product Form
const add_product_label = document.querySelector("label[for=add_product]")
const add_product_block = document.getElementById(add_product_label.htmlFor)
add_product_label.addEventListener('click', e => {
	toggle_visibility(add_product_block)
})

add_product_block.querySelector('button').addEventListener('click', e => {
	e.preventDefault()

	const prod_name_input = add_product_block.querySelector('[name="prod_name"]')
	const prod_price_input = add_product_block.querySelector('[name="prod_price"]')
	const prod_amount_input = add_product_block.querySelector('[name="prod_amount"]')
	
	add_product(prod_name_input.value, prod_price_input.value, prod_amount_input.value)

	prod_name_input.value = ""
	prod_price_input.value = ""
	prod_amount_input.value = ""
})



// Transfer Products Form
const transfer_products_label = document.querySelector("label[for=transfer_products]")
const transfer_products_block = document.getElementById(transfer_products_label.htmlFor)
transfer_products_label.addEventListener('click', e => {
	toggle_visibility(transfer_products_block)
})

transfer_products_block.querySelector('button').addEventListener('click', e => {
	e.preventDefault()

	const prod_name_input = transfer_products_block.querySelector('[name="prod_name"]')
	const prod_amount_input = transfer_products_block.querySelector('[name="prod_amount"]')
	
	transfer_product(prod_name_input.value, prod_amount_input.value)

	prod_name_input.value = ""
	prod_amount_input.value = ""
})



// Update Product Form
const update_product_label = document.querySelector("label[for=update_product]")
const update_product_block = document.getElementById(update_product_label.htmlFor)
update_product_label.addEventListener('click', e => {
	toggle_visibility(update_product_block)
})

update_product_block.querySelector('button').addEventListener('click', e => {
	e.preventDefault()

	const prod_name_input = update_product_block.querySelector('[name="prod_name"]')
	const prod_price_input = update_product_block.querySelector('[name="prod_price"]')
	const prod_amount_input = update_product_block.querySelector('[name="prod_amount"]')
	
	update_product(prod_name_input.value, prod_price_input.value, prod_amount_input.value)

	prod_name_input.value = ""
	prod_price_input.value = ""
	prod_amount_input.value = ""
})


function toggle_visibility(element)
{
	if (element.classList.contains('hide'))
	{
		element.classList.remove('hide')
	} else {
		element.classList.add('hide')
	}
}