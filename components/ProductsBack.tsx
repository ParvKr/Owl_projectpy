"use client";

import React, { useState } from "react";
import axios from "axios";

// Define the Product type with the new 'url' field
interface Product {
    title: string;
    price: string;
    rating: string;
    review: string;
    availability: string;
    url: string; // Add URL property to store product URL
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]); // Initialize as an array
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>("");

    // Fetch products when the prompt is submitted
    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();

        // Check if there's a prompt and prevent empty searches
        if (prompt.trim() === "") return;

        setLoading(true); // Start loading
        setError(null); // Reset error before starting the request

        // Make a dynamic API request with the prompt
        axios
            .get(`http://127.0.0.1:5000/members?prompt=${prompt}`)
            .then((response) => {
                console.log("API response:", response.data);
                if (response.data && Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    console.error("API response is not an array", response.data);
                    setError("Unexpected response format");
                }
                setLoading(false); // Stop loading
            })
            .catch((error) => {
                console.error("API error:", error.response || error.message);
                setError(error.response?.data?.error || "Failed to fetch data");
                setLoading(false); // Stop loading
            });
    };

    // Copy the URL to the clipboard
    const handleCopyLink = (url: string) => {
        navigator.clipboard.writeText(url)
            .then(() => alert('Product link copied to clipboard!'))
            .catch((error) => console.error("Failed to copy text: ", error));
    };

    return (
        <div className="min-h-screen py-8 px-4">
            <h1 className="text-primary">Amazon Monitor Products</h1>
            
            {/* Search Form */}
            <form className="flex items-center justify-center flex-wrap gap-4 mt-12" onSubmit={handleSearch}>
                <input
                    id="search"
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter product to search"
                    className="searchbar-input"
                />
                <button type="submit" className="searchbar-btn" disabled={prompt === ''}>Search</button>
            </form>

            {/* Loading & Error handling */}
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}

            {/* Display Results */}
            <table className="w-full border-collapse rounded-lg shadow-sm">
                <thead className="">
                    <tr className="">
                        <th className="py-2 px-4 text-left">Title (Click to copy URL)</th>
                        <th className="py-2 px-4 text-left">Price (Rs)</th>
                        <th className="py-2 px-4 text-left">Rating</th>
                        <th className="py-2 px-4 text-left">Reviews</th>
                        <th className="py-2 px-4 text-left">Availability</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4">
                                <span className=""
                                    style={{cursor: 'pointer' }}
                                    onClick={() => handleCopyLink(product.url)}>
                                    {product.title}
                                </span>
                            </td>
                            <td className="py-2 px-4">{product.price}</td>
                            <td className="py-2 px-4">{product.rating}</td>
                            <td className="py-2 px-4">{product.review}</td>
                            <td className="py-2 px-4">{product.availability}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Products;
