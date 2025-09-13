const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<title>UniGo - Email Verification</title>
			<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
		</head>
		<body style="font-family: 'Poppins', sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f4f4f4;">
			<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
				<!-- Logo and Header -->
				<div style="text-align: center; margin-bottom: 30px;">
					<img src="https://ibb.co/VWxp4XZF" alt="UniGo Logo" style="width: 150px; margin-bottom: 20px;">
					<div style="width: 100%; height: 2px; background: linear-gradient(to right, #4CAF50, #2196F3); margin: 20px 0;"></div>
				</div>

				<!-- Content -->
				<div style="padding: 20px 0;">
					<h2 style="color: #333333; text-align: center; font-size: 24px; margin-bottom: 30px;">Email Verification</h2>
					<p style="color: #666666; font-size: 16px;">Hello,</p>
					<p style="color: #666666; font-size: 16px;">Thank you for choosing UniGo! Please use the following OTP to verify your email address:</p>
					
					<!-- OTP Box -->
					<div style="background: linear-gradient(135deg, #4CAF50, #2196F3); padding: 3px; border-radius: 10px; margin: 30px 0;">
						<div style="background-color: #ffffff; padding: 20px; border-radius: 8px; text-align: center;">
							<h1 style="color: #333333; margin: 0; font-size: 36px; letter-spacing: 5px;">${otp}</h1>
						</div>
					</div>

					<!-- Additional Information -->
					<p style="color: #666666; font-size: 14px; margin-bottom: 5px;">⏰ This OTP is valid for 5 minutes.</p>
					<p style="color: #666666; font-size: 14px;">🔒 If you didn't request this verification, please ignore this email.</p>
				</div>

				<!-- Footer -->
				<div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
					<p style="color: #666666; margin-bottom: 5px;">Best regards,</p>
					<p style="color: #4CAF50; font-weight: 600; margin: 0;">UniGo Team</p>
				</div>
			</div>
		</body>
	</html>`
	
}

module.exports = otpTemplate;