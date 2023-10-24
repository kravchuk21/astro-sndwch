import { useStore } from '@nanostores/solid';
import {Show, createSignal } from 'solid-js';
import {$cart as cart ,removeItemFromCart, subtotal } from '../stores/cart';
import styles from "./cart.module.css";

function fotmatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

const EmptyState = () => {
    return (
        <>
            <p class={styles.icon}>
                <span role='img' aria-label="hot dog">
                    🌭
                </span>
            </p>
            <p class={styles. empty}>
                Your cart is empty! Add a sandwich kit or two and give flavor a chance.
            </p>
        </>
    )
}

const CheckoutNotice = () => {
    return <p class={styles. notice}>Checkout is not implemented yet.</p>
}

export const Cart = () => {
    const [showNotice,setShowNotice] = createSignal(false);
    const $subtotal = useStore(subtotal);
    const $cart = useStore(cart);

    return (
        <aside class={styles.cart}>
            <h2> Your cart</h2>
            <Show when={Object.values($cart()).length > 0} fallback={<EmptyState />}>
                <ul class={styles.items}>
                    {Object.values($cart()).map((entry: CartItem) => {
                        if (!entry) {
                            return null;
                        }

                        return (
                            <li class={styles.item}>
                                <span class={styles.quantity}>{entry.quantity}</span>
                                <span class={styles.name}>{entry.item.title}</span>
                                <span class={styles.remove}> 
                                    <button title="remove item" onclick={() => removeItemFromCart(entry. item.id)}>
                                        &times;
                                    </button>
                                </span>
                                <span class={styles.price}>{entry.item.price}</span>
                            </li>
                        )
                    })}
                </ul>

                <div class={styles.details}>
                    <p class={styles.subtotal}>
                        <span class={styles. label}>Subtotal:</span>{' '}
                        {fotmatCurrency($subtotal())}
                    </p>

                    <p class={ styles. shipping}> 
                        <span class={styles. label}>Shipping:</span>{' '}
                        <del>$10.00</del>
                        <ins>FREE</ins>
                    </p>

                    <p class={styles.total}> 
                        <span class={styles. label}>Total:</span>{' '}
                        {fotmatCurrency($subtotal())}
                    </p>

                    <p class={styles.checkout}>
                        <button class="big-link" onClick={() => setShowNotice(true)}>Check Out</button>
                    </p>

                    <Show when={showNotice()}>
                        <CheckoutNotice />
                    </Show>
                </div>
            </Show>
        </aside>
    )
}