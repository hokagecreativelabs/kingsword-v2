"use client";
import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaSpinner } from 'react-icons/fa';

const initialValues = { fullName: '', email: '', city: '' };

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  city: Yup.string().required('City is required'),
});

const WorshipPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsLoading(false), 2000); // Simulate a delay
    return () => clearTimeout(timeoutId);
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch('/api/worship', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      // Try to parse JSON only if content-type is application/json
      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json')
        ? await response.json()
        : null;
  
      if (!response.ok) throw new Error(data?.message || 'Failed to submit');
  
      toast.success("Thank you for your submission, we will reach out to you shortly.");
      setSuccessMessage("Thank you for your submission, we will reach out to you shortly.");
      setErrorMessage(null);
      resetForm();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit form. Please try again.");
      setErrorMessage("Failed to submit form. Please try again.");
      setSuccessMessage(null);
    } finally {
      setSubmitting(false);
    }
  };
  
  

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="flex flex-col lg:flex-row lg:space-x-10 justify-center items-center">
        {/* Slanted Image Gallery */}
        <div className="w-full lg:w-1/2 grid grid-cols-2 md:grid-cols-2 gap-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="col-span-1 relative h-40 md:h-56 lg:h-64">
                <Skeleton height="100%" width="100%" className="rounded-lg" />
              </div>
            ))
          ) : (
            ['/assets/other.webp', '/assets/111.webp', '/assets/222.webp', '/assets/333.webp'].map((src, index) => (
              <div key={index} className="col-span-1 relative h-40 md:h-56 lg:h-64">
                <img
                  src={src}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg object-cover"
                  style={{ transform: `translateY(${index % 2 === 0 ? '5px' : '-5px'})` }}
                />
              </div>
            ))
          )}
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center">Worship with us</h2>
            {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">
                      Full name
                    </label>
                    <Field
                      type="text"
                      id="fullName"
                      name="fullName"
                      className="w-full p-3 border border-gray-300 rounded shadow-sm"
                      placeholder="John Doe"
                    />
                    <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                      Email address
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="w-full p-3 border border-gray-300 rounded shadow-sm"
                      placeholder="you@example.com"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
                      City
                    </label>
                    <Field
                      as="select"
                      id="city"
                      name="city"
                      className="w-full p-3 border border-gray-300 rounded bg-white shadow-sm"
                    >
                      <option value="">Select city</option>
                      <option value="Calgary">Calgary</option>
                      <option value="Toronto">Toronto</option>
                      <option value="Vancouver">Vancouver</option>
                      <option value="Others">Others</option>
                    </Field>
                    <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black hover:bg-[#c27803] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" /> Submitting...
                      </>
                    ) : (
                      'Worship with us'
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default WorshipPage;
