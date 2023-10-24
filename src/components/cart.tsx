import { useStore } from '@nanostores/solid';
import {Show, createSignal } from 'solid-js';
import {$cart,removeItemFromCart, subtotal } from '../stores/cart';
import styles from "./cart.module.css";

function fotmatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}