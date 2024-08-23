import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import { ChangeEvent, FormEvent, useState } from 'react';

interface FormData {
    firstName: string
    lastName: string
    email: string
    message: string
}

interface FormErrors {
    firstName?: string
    lastName?: string
    email?: string
    message?: string
}

const Contact: React.FC = () => {

    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    })

    const [formErrors, setFormErrors] = useState<FormErrors>({})

    const validate = (): boolean => {
        const errors: FormErrors = {}

        if (!formData.firstName) {
            errors.firstName = 'First Name is required.'
        }

        if (!formData.email) {
            errors.email = 'Email is required.'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email format is invalid.';
        }

        if (!formData.message) {
            errors.message = 'Message is required.'
        }

        setFormErrors(errors)

        return Object.keys(errors).length === 0
    }

    // Handle input changes
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleContactUsFormSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (validate()) {
            console.log(formData)
            // invoke API
        }
    }

    return (
        <div className="contact-us flex flex-column pt-4 w-full overflow-hidden">
            <div className="grid grid-nogutter surface-0 text-800">
                <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center">
                    <section>
                        <span className="block text-6xl font-bold mb-1">
                            We would love
                        </span>
                        <div className="text-6xl text-primary font-bold mb-3">
                            to hear from you!!
                        </div>
                    </section>
                </div>
                <div className="col-12 md:col-6 overflow-hidden">
                    <div className="col-12">
                        <div className="card">
                            <h2>Contact Us</h2>
                            <form onSubmit={handleContactUsFormSubmit}>
                                <div className="p-fluid formgrid grid">
                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="firstName">Firstname</label>
                                        <InputText
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className={classNames({ 'p-invalid': formErrors.firstName})}
                                        />
                                        {formErrors.firstName && <small className="p-error">{formErrors.firstName}</small>}
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="lastName">Lastname</label>
                                        <InputText
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="email">Email Id</label>
                                        <InputText
                                            id="email"
                                            name="email"
                                            type="text"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={classNames({ 'p-invalid': formErrors.email})}
                                        />
                                        {formErrors.email && <small className="p-error">{formErrors.email}</small>}
                                    </div>
                                    <div className="field col-12">
                                        <label htmlFor="message">Message</label>
                                        <InputTextarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            value={formData.message} 
                                            onChange={handleInputChange}
                                            className={classNames({ 'p-invalid': formErrors.message})}
                                        />
                                        {formErrors.message && <small className="p-error">{formErrors.message}</small>}
                                    </div>
                                </div>
                                <Button
                                    label="Submit"
                                    icon="pi pi-arrow-right"
                                    className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap"
                                    type='submit'
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact