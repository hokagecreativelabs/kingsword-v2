"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSpinner } from 'react-icons/fa';
import { HeartHandshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const initialValues = { fullName: '', email: '', city: '' };

const validationSchema = Yup.object({
  fullName: Yup.string().trim().max(80, 'Full name is too long').required('Full name is required'),
  email: Yup.string().trim().lowercase().email('Invalid email address').max(120, 'Email is too long').required('Email is required'),
  city: Yup.string().required('City is required'),
});

const worshipGallery = ['/assets/other.webp', '/assets/111.webp', '/assets/222.webp', '/assets/333.webp'];

const WorshipPage = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % worshipGallery.length);
    }, 3500);

    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      const payload = {
        fullName: values.fullName.trim(),
        email: values.email.trim().toLowerCase(),
        city: values.city,
      };

      const response = await fetch('/api/worship', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        cache: 'no-store',
        credentials: 'same-origin',
        signal: controller.signal,
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
      const message = error.name === 'AbortError'
        ? 'Request timed out. Please try again.'
        : 'Failed to submit form. Please try again.';
      toast.error(message);
      setErrorMessage(message);
      setSuccessMessage(null);
    } finally {
      clearTimeout(timeoutId);
      setSubmitting(false);
    }
  };
  
  

  return (
    <section className="w-full bg-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row lg:space-x-10 justify-center items-center lg:items-stretch">
        {/* Fan Image Carousel */}
        <div className="w-full lg:w-1/2 lg:flex-shrink-0 lg:min-h-[568px] flex flex-col justify-center">
          <>
            <div className="relative h-[390px] md:h-[460px] lg:h-[540px]">
              {worshipGallery.map((src, index) => {
                let delta = index - activeCard;
                const total = worshipGallery.length;

                if (delta > total / 2) delta -= total;
                if (delta < -total / 2) delta += total;

                const isVisible = Math.abs(delta) <= 2;

                return (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveCard(index)}
                    aria-label={`Show worship image ${index + 1}`}
                    className="absolute left-1/2 top-1/2 h-[310px] w-[58%] md:h-[370px] md:w-[54%] lg:h-[430px] lg:w-[50%] -translate-y-1/2"
                    style={{
                      transform: `translate(-50%, -50%) translateX(${delta * 56}px) rotate(${delta * 4}deg) scale(${delta === 0 ? 1 : 0.93})`,
                      opacity: isVisible ? (delta === 0 ? 1 : 0.84) : 0,
                      zIndex: 30 - Math.abs(delta),
                      pointerEvents: isVisible ? 'auto' : 'none',
                      transition: 'transform 420ms ease, opacity 420ms ease',
                    }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/80 shadow-2xl">
                      <Image
                        src={src}
                        alt={`Worship gallery ${index + 1}`}
                        fill
                        sizes="(max-width: 1024px) 58vw, 24vw"
                        className="object-cover"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {worshipGallery.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveCard(index)}
                  aria-label={`Go to image ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeCard === index ? 'w-8 bg-black' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:flex-shrink-0 lg:min-h-[568px] flex flex-col justify-center">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form className="space-y-4 w-full" noValidate>
                <Card className="bg-white border border-black/10 rounded-2xl shadow-xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-amber-50 via-white to-amber-50 border-b border-black/5">
                    <div className="flex items-center justify-center gap-2 text-[11px] tracking-[0.14em] uppercase text-gray-500 font-semibold">
                      <HeartHandshake className="w-4 h-4" />
                      Join Our Worship Family
                    </div>
                    <CardTitle className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mt-2">
                      Worship with us
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pt-6">
                    {successMessage && (
                      <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-700 text-sm">
                        {successMessage}
                      </div>
                    )}
                    {errorMessage && (
                      <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-red-700 text-sm">
                        {errorMessage}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 md:col-span-1">
                        <Label htmlFor="fullName" className="text-gray-700">Full name</Label>
                        <Field name="fullName">
                          {({ field }) => (
                            <Input
                              {...field}
                              type="text"
                              id="fullName"
                              autoComplete="name"
                              maxLength={80}
                              placeholder="John Doe"
                              className="h-11 rounded-xl border-gray-300 bg-white"
                            />
                          )}
                        </Field>
                        <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
                      </div>

                      <div className="space-y-2 md:col-span-1">
                        <Label htmlFor="email" className="text-gray-700">Email address</Label>
                        <Field name="email">
                          {({ field }) => (
                            <Input
                              {...field}
                              type="email"
                              id="email"
                              autoComplete="email"
                              maxLength={120}
                              placeholder="you@example.com"
                              className="h-11 rounded-xl border-gray-300 bg-white"
                            />
                          )}
                        </Field>
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label htmlFor="city" className="text-gray-700">City</Label>
                      <Select value={values.city} onValueChange={(value) => setFieldValue('city', value)}>
                        <SelectTrigger id="city" className="h-12 w-full rounded-xl border-gray-300 bg-white">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent align="start" className="min-w-[var(--anchor-width)]">
                          <SelectItem value="Calgary">Calgary</SelectItem>
                          <SelectItem value="Toronto">Toronto</SelectItem>
                          <SelectItem value="Vancouver">Vancouver</SelectItem>
                          <SelectItem value="Others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                      <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
                    </div>
                  </CardContent>
                </Card>

                <div className="pt-1">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-auto w-full bg-black hover:bg-[#c27803] text-white font-bold py-3 px-6 rounded-xl transition-colors duration-300 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" /> Submitting...
                      </>
                    ) : (
                      'Reserve your worship spot'
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
      </div>
    </section>
  );
};

export default WorshipPage;
