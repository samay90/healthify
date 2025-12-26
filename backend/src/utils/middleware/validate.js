const validate = (schema) => (req, res, next) => {
    const body = req.body;
    if (!!!body) {
        for (const field in schema) {
            if (schema[field].required) {
                return res.status(400).json({
                    error: true,
                    message: `${field} is required`
                });
            }
        }
    }
    for (const field in schema) {
        if (!!!body) continue;
        const rules = schema[field];
        const value = body[field];
        if (rules.required && (value === undefined || value === null)) {
            return res.status(400).json({
                error: true,
                message: `${field} is required`
            });
        }
        if (value === undefined || value === null) continue;

        const actualType = Array.isArray(value) ? "array" : typeof value;

        if (rules.type && rules.type !== actualType) {
            return res.status(400).json({
                error: true,
                message: `${field} must be of type ${rules.type}`
            });
        }
        if (rules.minLength && (value.length < rules.minLength)) {
            return res.status(400).json({
                error: true,
                message: `${field} must be at least ${rules.minLength} characters long`
            });
        }
        if (rules.maxLength && (value.length > rules.maxLength)) {
            return res.status(400).json({
                error: true,
                message: `${field} must not exceed ${rules.maxLength} characters`
            });
        }
        
        if (rules.min !== undefined && value < rules.min) {
            return res.status(400).json({
                error:true,
                message: `${field} must be >= ${rules.min}`
            });
        }
        if (rules.max !== undefined && value > rules.max) {
            return res.status(400).json({
                error:true,
                message: `${field} must be <= ${rules.max}`
            });
        }
    }    
    next();
}

module.exports = validate