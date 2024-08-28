import React from 'react';


const MainContent = () => {
    return (
        <main>
            <section id="intro">
                <h2>Welcome to Certicue</h2>
                <div className='flex'>
                    <div>
                <p className='para'>Your one-stop solution for seamless certificate verification and management. At Certicue, we are dedicated to simplifying the process of obtaining and verifying internship certificates, providing a user-friendly platform for both students and administrators.</p>
                <p className='para'>Our vision is to redefine the traditional methods of handling internship certificates by leveraging advanced technology and user-centric design. We aim to create a transparent, secure, and highly efficient system that addresses the needs of all stakeholders involved.</p>
                </div>
                <img src="https://media.istockphoto.com/id/1401547537/vector/verified-square-grunge-checkmark-icon-vector-stock-illustration.jpg?s=612x612&w=0&k=20&c=AUG8-aE5mmykLu-iUIkf8jRdNX0ByZTBTecJf4ogGH0=" alt="verification image" />
                </div>
                </section>

            <section id="students">
                <h2>For Students</h2>

                <div className='flex'>
                <img src="https://th.bing.com/th/id/OIGP.BTe028kzag2DURyqnNyj?pid=ImgGn" alt="students image"/>
                    <div>
                <p className='para'>At Certicue, we understand the importance of having verified and accessible internship certificates. Our platform allows students to effortlessly download their internship certificates, ensuring they have quick and reliable access to their credentials. With just a few clicks, you can retrieve your certificates, view verification details, and download them for your records.</p>
                <p className='para'>Navigating the world of internship certificates has never been easier. Certicue empowers students with a user-friendly interface that allows them to quickly and easily access their internship certificates. Whether you need to download your certificate for a job application or simply want to keep a record of your achievements, Certicue ensures that you can do so with minimal hassle. Our system guarantees that your certificates are not only accessible but also securely verified, giving you peace of mind and credibility in your professional journey.</p>
                </div>
                
                </div>
            </section>

            <section id="administrators">
                <h2>For Administrators</h2>
                <div className='flex'>
                    <div>
                <p className='para'>Managing certificate records has never been easier. Certicue offers a comprehensive suite of tools for administrators to upload, organize, and manage internship certificate files. Our platform supports bulk uploads via Excel files, making it efficient to handle large volumes of data. Administrators can easily keep track of submissions, update records, and ensure that all information is accurate and up-to-date.</p>
                <p className='para'>Managing certificates can be a complex and time-consuming task, especially when dealing with large volumes of data. Certicue simplifies this by offering a powerful set of tools designed specifically for administrators. Our platform supports bulk uploads via Excel files, allowing you to efficiently manage and update multiple records at once. You can organize, verify, and track all certificates with ease, reducing administrative burden and improving accuracy. Our comprehensive dashboard provides a clear overview of all activities, making it easier to oversee and maintain certificate records.</p>
                </div>
                <img src="https://th.bing.com/th/id/OIG3.vhvLP9XIXvwF9fJBve4S?w=1024&h=1024&rs=1&pid=ImgDetMain" alt="admin image"/>
                </div>
            </section>

            <section id="mission">
                <h2>Our Mission</h2>
                <div className='flex'>
                <img src="https://img1.wsimg.com/isteam/ip/1a4d5d98-5c50-4efe-b2de-f528e039e969/shutterstock_1792667593.jpg/:/cr=t:0%25,l:16.66%25,w:66.68%25,h:100%25/rs=w:365,h:365,cg:true" alt="mission image"/>
                <div>
                    <p className='para'>At Certicue, our mission is to revolutionize the certificate verification process by leveraging cutting-edge technology to enhance efficiency and transparency. We are committed to delivering a reliable and secure platform that meets the needs of both students and administrators. Our goal is to reduce the complexities associated with certificate management, allowing users to focus on their core activities and achievements. We strive to provide exceptional service and support, ensuring a seamless experience for everyone involved.</p>

<p className='para'>Thank you for choosing Certicue as your trusted partner in certificate management. We look forward to supporting you in achieving your professional goals and simplifying your certificate-related needs.</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default MainContent;
