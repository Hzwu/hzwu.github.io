function [watermarked_block] = embed_SVD(original_block, message_bit, quantization_step)

[U, D, V] = svd(original_block);
B = floor(D(1,1) / quantization_step) * quantization_step;
Q = quantization_step / 4;
A = [B - Q, B + Q, B + 3 * Q, B + 5 * Q];
N = length(A);
T = 1e10;
I = -1;
for i = 1:N
    distance = A(i) - floor(A(i) / quantization_step) * quantization_step;
    present_bit = 0;
    if distance > (2 * Q)
        present_bit = 1;
    end
    if present_bit == message_bit
        temp_D = D;
        temp_D(1,1) = A(i);
        temp_block = U * temp_D * V';
        temp_block = double(uint8(temp_block));
        D_ = svd(temp_block);
        distance_2 = D_(1) - floor(D_(1) / quantization_step) * quantization_step;
        extracted_bit = 0;
        if distance_2 > (2 * Q)
            extracted_bit = 1;
        end
        if extracted_bit == message_bit
            distance_3 = sum(sum((original_block - temp_block).^2));
            if distance_3 < T
                T = distance_3;
                I = i;
            end
        end
    end
end
if I < 0
    error('Error');
else
    D(1,1) = A(I);
    watermarked_block = U * D * V';
    watermarked_block = double(uint8(watermarked_block));
end

% =========================================================================
