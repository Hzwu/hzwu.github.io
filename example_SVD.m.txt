clear all; clc;

img = double(imread('../images/bmps/lena.bmp'));
% figure, imshow(img, []);
[row, col] = size(img);
block_size = 8;
msg_length = floor(row / block_size) * floor(col / block_size);
msg = double(rand(1, msg_length) > 0.5);
img_marked = img;
id_present = 0;
Q = 16;
for i = 1:block_size:row
    for j = 1:block_size:col
        id_present = id_present + 1;
        block_marked = embed_SVD(img_marked(i:(i+block_size-1), j:(j+block_size-1)), msg(id_present), Q);
        img_marked(i:(i+block_size-1), j:(j+block_size-1)) = double(uint8(block_marked));
    end
end
fprintf('Embedded successfully ...\n');
figure, imshow(img_marked, []);
MSE = sum(sum((img - img_marked).^2)) / row / col;
PSNR = 10 * log10(255 * 255 / MSE);
fprintf('MSE = %.4f, PSNR = %.4f dB\n', MSE, PSNR);

msg_recovered = zeros(1, msg_length);
id_present = 0;
for i = 1:block_size:row
    for j = 1:block_size:col
        id_present = id_present + 1;
        msg_recovered(id_present) = extract_SVD(img_marked(i:(i+block_size-1), j:(j+block_size-1)), Q);
    end
end
fprintf('Extracted successfully ...\n');
BER = sum((msg - msg_recovered).^2) / msg_length;
fprintf('BER = %.4f (errors = %d, total = %d)\n', BER, floor(BER * msg_length), msg_length);

% =========================================================================
