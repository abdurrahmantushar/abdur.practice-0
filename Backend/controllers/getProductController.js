import { ProductModel } from "../Models/Product-Model.js";

// Add Product
export const AddProductController = async (req, res) => {
    try {
        const { name, image, category, subCategory, unit, stock, price, discount, description, more_details, publish } = req.body;

        if (!name || !image || !category || !price) {
            return res.status(400).json({
                message: 'Enter required fields',
                error: true,
                success: false
            });
        }

        const addProduct = new ProductModel({
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details,
            publish
        });

        const saveProduct = await addProduct.save();

        if (!saveProduct) {
            return res.status(500).json({
                message: 'Not created',
                error: true,
                success: false
            });
        }

        return res.json({
            message: 'Successfully added',
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Get Products
export const getProductController = async (req, res) => {
    try {
        const data = await ProductModel.find()
            .populate("category", "name")
            .populate("subCategory", "name");
        return res.json({
            data: data,
            error: false,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Update Product
export const updateProductController = async (req, res) => {
    try {
        const { _id, name, image, category, subCategory, unit, stock, price, discount, description, more_details, publish } = req.body;

        const update = await ProductModel.updateOne(
            { _id },
            { name, image, category, subCategory, unit, stock, price, discount, description, more_details, publish }
        );

        return res.json({
            message: 'Update Done',
            error: false,
            success: true,
            data: update
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Delete Product
export const deleteProductController = async (req, res) => {
    try {
        const { _id } = req.body;

        const deleteProduct = await ProductModel.deleteOne({ _id });

        return res.json({
            message: "Delete Successful",
            error: false,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};
