export function AddPromotionLastStep (errors){
    return (
        <div>ffff 
            {errors.root && (
                <div className="text-red-500">{errors.root.message}</div>    
            )}
        </div>
    )
}