app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    /*html*/
    `<div class="product-display">
        <div class="product-container">
        <div class="product-image">
            <!-- image goes here -->
            <img :src="image" alt="Socks">
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock >= 10">In Stock </p>
            <p v-else-if="inStock < 10 && inStock > 0">Almost sold out!!!</p>
            <p v-else>Out of Stock </p>
            <p> Shipping: {{ shipping }} </p>
            <ul>
            <li v-for="detail in details">{{detail}}</li>
            </ul>
            <div v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)" class="color-circle" :style="{backgroundColor: variant.color}"></div>
            <button class="button" @click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to Cart</button>
        </div>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
    </div>`,
    data() {
        return {
          cart: 0,
          product: 'Socks',
          brand: 'Nioya Tech',
          selectedProduct: 0,
          details: ['50% cotton', '30% wool', '20% polyester'],
          variants: [
            { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
            { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 }
          ],
          reviews: []
        }
    },
    methods: {
        addToCart() {
          this.$emit('add-to-cart', this.variants[this.selectedProduct].id);
        },
        updateVariant(index) {
          this.selectedProduct = index;
        },
        addReview(review){
            this.reviews.push(review);
        }
    },
    computed: {
        title() {
          return this.brand + ' ' + this.product;
        },
        image() {
          return this.variants[this.selectedProduct].image;
        },
        inStock() {
          return this.variants[this.selectedProduct].quantity;
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 2.99
        }
    }

})