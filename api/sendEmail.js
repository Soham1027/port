export default async function handler(req, res) {
  if (req.method === 'POST') {
      const formData = new URLSearchParams(req.body);

      try {
          const response = await fetch('https://formspree.io/f/meoegqeb', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: formData.toString(),
          });

          if (response.ok) {
              return res.status(200).json({ success: true });
          } else {
              return res.status(500).json({ success: false, error: 'Form submission failed' });
          }
      } catch (error) {
          return res.status(500).json({ success: false, error: error.message });
      }
  } else {
      return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}