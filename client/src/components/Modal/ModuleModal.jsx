import React, { useEffect, useState } from "react";
import {
  X,
  Package,
  Save,
  ToggleLeft,
  ToggleRight,
  FileText,
} from "lucide-react";

const ModuleModal = ({
  isEdit,
  module,
  setIsEdit,
  setCurrentModule,
  setIsShowModal,
  handleSubmit,
  handleEdit,
  isSubmitting,
  errors,
  setErrors,
}) => {
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    moduleName: module?.moduleName || "",
    active: module?.active ?? true,
    description: module?.description || "",
  });

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleStatusUpdate = () => {
    setFormData((prev) => ({
      ...prev,
      active: !prev.active,
    }));
    console.log(formData.active);
  };

  return (
    <div className="fixed inset-0 bg-none bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-xl flex items-center justify-center mr-3">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {isEdit ? "Edit Module" : "Create Module"}
              </h2>
              <p className="text-sm text-gray-600">
                {isEdit ? "Edit Module Details" : "Add new module details"}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsShowModal(false);
              if (isEdit) {
                setIsEdit(false);
                setCurrentModule(null);
              }
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <div className="space-y-5">
            {/* Module Name */}
            <div>
              <label
                htmlFor="moduleName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Module Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="moduleName"
                  name="moduleName"
                  value={formData.moduleName}
                  onChange={handleUpdate}
                  className={`w-full px-4 py-3 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                    errors.moduleName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter module name"
                />
                <Package className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              </div>
              {errors.moduleName && (
                <p className="text-red-500 text-sm mt-1">{errors.moduleName}</p>
              )}
            </div>

            {/* Active Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Active
              </label>
              <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-3 ${
                      formData.active ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">
                    {formData.active ? "Active" : "Inactive"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleStatusUpdate}
                  className="focus:outline-none"
                >
                  {formData.active ? (
                    <ToggleRight className="w-8 h-8 text-indigo-600 hover:text-indigo-700 transition-colors" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-gray-400 hover:text-gray-500 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <div className="relative">
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleUpdate}
                  rows={4}
                  className={`w-full px-4 py-3 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors resize-none ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter module description"
                />
                <FileText className="w-4 h-4 text-gray-400 absolute left-4 top-4" />
              </div>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-100">
          <button
            onClick={() => {
              setIsShowModal(false);

              if (isEdit) {
                setIsEdit(false);
              }
            }}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (isEdit) {
                handleEdit(formData, setFormData);
              } else {
                handleSubmit(formData, setFormData);
              }
              setCurrentModule(null);
            }}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-medium hover:from-indigo-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                {isEdit ? "Updating..." : "Creating..."}
              </div>
            ) : (
              <div className="flex items-center">
                <Save className="w-4 h-4 mr-2" />
                {isEdit ? "Update Module" : "Create Module"}
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleModal;
