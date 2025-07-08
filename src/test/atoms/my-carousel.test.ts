import { fixture, html, expect } from '@open-wc/testing';
import '../../atoms/my-carousel';

suite('my-carousel', () => {
  test('renders as HTMLElement', async () => {
    const el = await fixture(html`<my-carousel></my-carousel>`);
    expect(el).to.be.instanceOf(HTMLElement);
  });

  test('renders slot content as slides', async () => {
    const el = await fixture(html`
      <my-carousel>
        <img src="https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg" />
        <img src="https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg" />
      </my-carousel>
    `);
    const slides = el.querySelectorAll('img');
    expect(slides.length).to.equal(2);
  });

  test('shows navigation buttons when showButtons is true', async () => {
    const el = await fixture(html`
      <my-carousel>
        <img src="https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg" />
        <img src="https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg" />
      </my-carousel>
    `);
    const prev = el.shadowRoot!.querySelector('.prev');
    const next = el.shadowRoot!.querySelector('.next');
    expect(prev).to.exist;
    expect(next).to.exist;
  });

  test('shows dots when showDots is true', async () => {
    const el = await fixture(html`
      <my-carousel showDots>
        <img src="https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg" />
        <img src="https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg" />
        <img src="https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg" />
      </my-carousel>
    `);
    const dots = el.shadowRoot!.querySelectorAll('.dot');
    expect(dots.length).to.equal(3);
  });

  test('navigates to next and previous slides', async () => {
    const el = await fixture(html`
      <my-carousel showButtons>
        <img src="https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg" />
        <img src="https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg" />
        <img src="https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg" />
      </my-carousel>
    `);
    const next = el.shadowRoot!.querySelector('.next') as HTMLElement;
    const prev = el.shadowRoot!.querySelector('.prev') as HTMLElement;
    // Initial index is 0
    expect((el as any).currentIndex).to.equal(0);
    next.click();
    await (el as any).updateComplete;
    expect((el as any).currentIndex).to.equal(1);
    prev.click();
    await (el as any).updateComplete;
    expect((el as any).currentIndex).to.equal(0);
  });

  test('loops to first slide when next is clicked on last slide and loop is true', async () => {
    const el = await fixture(html`
      <my-carousel showButtons loop>
        <img src="https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg" />
        <img src="https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg" />
      </my-carousel>
    `);
    const next = el.shadowRoot!.querySelector('.next') as HTMLElement;
    (el as any).currentIndex = 1;
    await (el as any).updateComplete;
    next.click();
    await (el as any).updateComplete;
    expect((el as any).currentIndex).to.equal(0);
  });

  test('autoplay advances slides', async () => {
    const el = await fixture(html`
      <my-carousel autoplay interval="10">
        <img src="https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg" />
        <img src="https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg" />
      </my-carousel>
    `);
    (el as any).currentIndex = 0;
    await new Promise((resolve) => setTimeout(resolve, 15));
    expect((el as any).currentIndex).to.equal(1);
  });

  test('dot click navigates to correct slide', async () => {
    const el = await fixture(html`
      <my-carousel showDots>
        <img src="https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg" />
        <img src="https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg" />
        <img src="https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg" />
      </my-carousel>
    `);
    const dots = el.shadowRoot!.querySelectorAll('.dot');
    (dots[2] as HTMLElement).click();
    await (el as any).updateComplete;
    expect((el as any).currentIndex).to.equal(2);
  });
});