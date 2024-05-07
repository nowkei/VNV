// Define the structure of the data expected by the function
interface ContactFormData {
  name: string;
  email: string;
  service: string;
  // Add other fields as necessary
}

export const sendContactForm = async (data: ContactFormData) =>
  fetch('/api/sendmail', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  }).then((res) => {
    if (!res.ok) throw new Error('Failed to send message');
    return res.json();
  });
